import { View, Text, ToastAndroid } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import bcrypt from "react-native-bcrypt";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserContext = createContext();
import * as FileSystem from "expo-file-system";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../server";
import { v4 as uuidv4 } from "uuid";
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [Org, setOrg] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [initialized, setInitialized] = useState(false); // ✅ key fix

  const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          setProfile(null);
          setOrg(null);
        }
        setInitialized(true);
        setLoading(false);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!user) return; // user not ready yet

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single(); // single because id is PK

      if (error) {
        console.log("PROFILE ERROR:", error.message);
        return;
      }

      console.log("PROFILE DATA:", data);
      setProfile(data);
      setAvatarUrl(data?.avatar_url || null); // set avatar URL from profile
    };

    const fetchOrganizations = async () => {
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("create_by", user.user.id);

      if (error) {
        console.log("ORG ERROR:", error.message);
        return;
      }

      console.log("ORG DATA:", data);
      setOrg(data);
    };

    fetchProfile();
    fetchOrganizations();
  }, [user]);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data) {
        ToastAndroid.show("Invalid email ❌", ToastAndroid.SHORT);
        return;
      }

      // ⚠️ WARNING: no password check (not secure)
      // 👉 temporary only

      setUser(data);
      setIsLoggedIn(true);

      ToastAndroid.show("Login Successful ✅", ToastAndroid.SHORT);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Login error ❌", ToastAndroid.SHORT);
    } finally {
      setLoading(false); // ✅ important
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/signin");
  };

  const uploadImage = async (localUri, userId) => {
    try {
      // read file as base64
      const base64 = await FileSystem.readDirectoryAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = `avatars/${userId}_${Date.now()}.jpg`;

      // upload to supabase storage bucket "avatars"
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, decode(base64), {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const publicUrl = data.publicUrl;

      // save url to profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      // update local state
      setAvatarUrl(publicUrl);
      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));

      return publicUrl;
    } catch (err) {
      console.error("uploadImage error:", err.message);
      return null;
    }
  };

  if (!initialized) return null;

  const sendInvite = async (email, orgId) => {
    try {
      const { data, error: insertError } = await supabase
        .from("invites")
        .insert({
          org_id: orgId,
          id: user.id,
        })
        .select("id, token")
        .single();

      if (insertError) throw insertError;

      const { error: funcerror } = await supabase.functions.invoke(
        "send-invite",
        {
          body: { email, orgId, token: data.token, userId: user.id },
        },
      );

      if (funcerror) throw funcerror;
      return { success: true, token: data.token };
    } catch (error) {
      console.error("Invite error:", error);
      return { success: false, error: error.message };
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        logout,
        loading,
        login,
        uploadImage,
        profile,
        Org,
        sendInvite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
