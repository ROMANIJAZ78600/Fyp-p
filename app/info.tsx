import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";

const info = () => {
  const [fullname, setFullName] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleNext = async () => {
    if (!fullname) {
      ToastAndroid.show("Please Enter Your fullname. ", ToastAndroid.SHORT);
      router.replace("/info");
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
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      fullname: fullname,
    });

    if (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log(error.message);
    }
    router.replace("/createorganization");
  };
  console.log(user);

  return (
    <View className="absolute top-[220px] w-full">
      <View className="p-5">
        <View className="gap-3 mb-4">
          <Text className="text-xl">Full Name</Text>
          <TextInput
            value={fullname}
            onChangeText={(text) => setFullName(text)}
            className="bg-surface border border-secondary rounded-lg shadow-sm p-4"
            placeholder="John Doe"
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

export default info;
