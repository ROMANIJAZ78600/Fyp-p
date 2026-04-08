import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const Card = () => {
  return (
    <View className="p-3 flex-row gap-5 flex-wrap">
      <View className="flex-row justify-center w-[47%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl font-bold text-center">47</Text>
          <Text className="text-xl text-secondary">Completed Task</Text>
        </View>
      </View>
      <View className="flex-row justify-center w-[46%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2 ">
          <Text className="text-xl font-bold text-center">12</Text>
          <Text className="text-xl text-secondary text-center">
            Active Task
          </Text>
        </View>
      </View>
      <View className="flex-row justify-center w-[46%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl font-bold text-center">8</Text>
          <Text className="text-xl text-secondary">Team Members</Text>
        </View>
      </View>
      <View className="flex-row justify-center w-[46%] bg-gray-200 p-4 rounded-xl">
        <View className="gap-2">
          <Text className="text-xl font-bold text-center">94%</Text>
          <Text className="text-xl text-secondary">Success Rate</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
