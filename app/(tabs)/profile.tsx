import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Card from "@/components/Card";
import Settings from "@/components/Settings";
import { UserContext } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
const Profile = () => {
  const { user, isLoggedIn, uploadImage, profile, Org } =
    useContext(UserContext);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(profile?.avatar_url || null);

  const updateAvatar = async (userId, avatarurl) => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarurl })
      .eq("id", userId); // assuming `id` is the primary key

    if (error) {
      console.log("Update error:", error);
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    if (!isLoggedIn || !user) {
      ToastAndroid.show("Please login first ❌", ToastAndroid.SHORT);
      return;
    }
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // upload and update avatar
      const avatarurl = await uploadImage(result.assets[0].uri, user.id);
      if (avatarurl) {
        await updateAvatar(user.id, avatarurl);
        ToastAndroid.show("Profile picture updated ✅", ToastAndroid.SHORT);
      }
    }
  };

  console.log("profile", profile);
  console.log("ORG", Org);
  console.log("user", user);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-5">
          <View className="bg-primary w-full h-[150px] rounded-xl">
            <View className="flex-row items-center">
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-28 h-28 rounded-full items-center justify-center relative top-4 left-5"
                />
              ) : (
                <View className="bg-slate-100 w-28 h-28 rounded-full items-center justify-center relative top-4 left-5">
                  <Text className="text-primary text-lg font-bold">
                    {user?.user?.email?.slice(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              <View className="ml-[50px] mt-[25px]">
                <Text className="text-surface text-xl">
                  {profile?.fullname}
                </Text>
                <Text className="text-secondary text-xl">Project Manager</Text>
                <Text className="text-secondary text-xl">{Org?.[0]?.name}</Text>
                <Text className="text-secondary text-xl">
                  Joined At {user?.user?.created_at?.slice(0, 10)}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="absolute" onPress={pickImage}>
              <Ionicons
                name="camera-outline"
                color={"black"}
                size={20}
                className="bg-slate-100 rounded-full p-2 absolute top-20 left-20 z-10 mt-5 ml-5"
              />
            </TouchableOpacity>
          </View>
          <Card />
          {/* Achievements */}
          <View className="mt-3">
            <Text className="font-bold" style={{ fontSize: 18 }}>
              Achievments
            </Text>
          </View>

          {/* Settings */}
          <Settings />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
