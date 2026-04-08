import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const DashboardData = () => {
  return (
    <View className="p-5 flex-row gap-5 flex-wrap">
      <View className="flex-row justify-between w-[48%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl text-secondary">Active Task</Text>
          <Text className="text-xl font-bold">12</Text>
        </View>
        <View className="mt-4">
          <Ionicons name="checkmark-circle-outline" size={26} />
        </View>
      </View>
      <View className="flex-row justify-between w-[46%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl text-secondary">Overdue</Text>
          <Text className="text-xl font-bold">3</Text>
        </View>
        <View className="mt-4">
          <Ionicons name="alert-circle-outline" size={26} />
        </View>
      </View>
      <View className="flex-row justify-between w-[48%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl text-secondary">Team Members</Text>
          <Text className="text-xl font-bold">8</Text>
        </View>
        <View className="mt-4">
          <Ionicons name="people-outline" size={26} />
        </View>
      </View>
      <View className="flex-row justify-between w-[46%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl text-secondary">Completed</Text>
          <Text className="text-xl font-bold">47</Text>
        </View>
        <View className="mt-4">
          <Ionicons name="trending-up" size={26} />
        </View>
      </View>
    </View>
  );
};

export default DashboardData;
