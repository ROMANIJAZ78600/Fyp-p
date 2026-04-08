import {
  View,
  Text,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { UserContext } from "@/context/UserContext";

const createorganization = () => {
  const [organization, setOrganization] = useState("");
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleNext = async () => {
    if (!organization) {
      ToastAndroid.show(
        "Please enter the organization name.",
        ToastAndroid.SHORT,
      );
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      ToastAndroid.show(
        "User not found. Please log in again.",
        ToastAndroid.SHORT,
      );
      router.replace("/signin");
      return;
    }
    const { error } = await supabase.from("organizations").insert({
      name: organization,
      create_by: user.id,
    });
    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      return;
    }
    router.replace("/signin");
  };
  return (
    <View className="absolute top-[220px] w-full">
      <View className="p-5">
        <View className="gap-3 mb-4">
          <Text className="text-xl">Orgnaization</Text>
          <TextInput
            value={organization}
            onChangeText={(text) => setOrganization(text)}
            className="bg-surface border border-secondary rounded-lg shadow-sm p-4"
            placeholder="Make Your Organization"
          />
        </View>
        <View>
          <TouchableOpacity
            className="items-center p-3 bg-primary rounded-lg"
            onPress={() => handleNext()}
          >
            <Text className="text-white">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default createorganization;
