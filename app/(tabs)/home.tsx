import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardData from "@/components/DashboardData";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { UserContext } from "@/context/UserContext";

const Home = async () => {
  const { user } = useContext(UserContext);
  const initials = user?.user?.email?.slice(0, 2).toUpperCase();
  const hour = new Date().getHours();
  const router = useRouter();

  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Welcome to Workflow";
  }
  return (
    <SafeAreaView>
      <View className="p-5">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: 27, fontWeight: "600" }}>{greeting}</Text>
          <View className="w-12 h-12 bg-primary rounded-full">
            <Text className="text-surface text-center mt-3">{initials}</Text>
          </View>
        </View>
        <View className="absolute top-4 right-6 bg-accent size-3 rounded-full items-center justify-center" />
        <Text className="text-secondary text-xl relative bottom-2">
          Here's your workflow overview
        </Text>
      </View>
      <View>
        <DashboardData />
      </View>
      <View className="flex-row justify-between  bg-primary p-5 w-[95%] ml-3 rounded-[15px]">
        <View className="textt-white">
          <Text className="font-bold text-xl text-surface">Quick Actions</Text>
          <Text className="text-secondary">Get things done faster</Text>
        </View>
        <View className="mr-3 ">
          <TouchableOpacity
            className="flex-row justify-between gap-3 bg-slate-600 px-3 py-2 rounded-lg"
            onPress={() => router.push("/createtask")}
          >
            <Ionicons name="add" size={20} color={"white"} />
            <Text className="text-surface"> New Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
