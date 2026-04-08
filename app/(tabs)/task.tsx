import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";

const Tasks = () => {
  const [activeIndex, setActiveIndex] = useState(null); // currently clicked button
  const buttons = ["All Tasks", "Pending", "In Progress", "Completed"];
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1">
      <View className="p-5">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: 27, fontWeight: "600" }} className="mt-2">
            Tasks
          </Text>
          <TouchableOpacity
            className="flex-row gap-6 bg-primary px-4 py-3 rounded-lg mt-2"
            onPress={() => router.push("/createtask")}
          >
            <Ionicons name="add" size={20} color={"white"} />
            <Text className="text-surface">Add Task</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-8 flex-row items-center border-2 border-gray-200 bg-slate-200 p-2 rounded-lg ">
          <Ionicons name="search" size={20} color="gray" className="mr-2" />
          <TextInput
            className="flex-1 "
            placeholder="Search..."
            placeholderTextColor={"gray"}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          className="mt-5 px-2"
          indicatorStyle="black"
        >
          {buttons.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setActiveIndex(index)}
                key={index}
                className={`rounded-lg px-4 py-2 ${
                  isActive
                    ? "bg-primary"
                    : "bg-transparent border border-primary"
                }`}
                style={{
                  marginRight: index === buttons.length - 1 ? 0 : 12,
                }}
              >
                <Text
                  className={`text-[18px] ${isActive ? "text-white" : "text-primary"}`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
