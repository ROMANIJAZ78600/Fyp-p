import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { TeamMembers } from "@/constants";
const CreateTask = () => {
  return (
    <View className="p-5">
      <View>
        <Text className="text-xl text-secondary font-bold">
          Add a new task to your workflow
        </Text>
      </View>
      <View className="mt-3">
        <Text className="text-lg text-secondary">Task Title</Text>
        <TextInput
          className="bg-slate-200 border-1 border-black rounded-lg p-5 py-3"
          placeholder="Enter task title"
        />
      </View>
      <View className="mt-3">
        <Text className="text-lg text-secondary">Description</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          className="bg-slate-200 border-1 border-black rounded-lg p-5 py-3"
          placeholder="Describe the task"
          style={{ textAlignVertical: "top" }}
        />
      </View>
      <View className="mt-3">
        <Text className="text-lg text-secondary">Priority</Text>
        <View className="border border-gray-300 rounded-lg bg-slate-200">
          <Picker>
            <Picker.Item label="Medium" />
            <Picker.Item label="High" />
          </Picker>
        </View>
      </View>
      <View className="mt-3">
        <Text className="text-lg text-secondary">Assign To</Text>
        <View className="border border-gray-300 rounded-lg bg-slate-200">
          <Picker>
            {TeamMembers &&
              TeamMembers.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.username}
                  value={"Select team members"}
                />
              ))}
          </Picker>
        </View>
      </View>
      <View className="mt-3">
        <TouchableOpacity className="bg-primary p-4 rounded-xl">
          <Text className="text-white text-center text-lg">Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTask;
