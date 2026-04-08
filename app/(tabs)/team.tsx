import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Clipboard,
  TextInput,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { TeamMembers } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { UserContext } from "@/context/UserContext";
const Team = () => {
  const { Org, sendInvite } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const orgId = Org?.id;
  const departments = [
    "Management",
    "Development",
    "Design",
    "Quality Assurance",
    "Operations",
  ];
  const token = Math.random().toString(36).slice(2, 8);

  const Invite_Link = `https://smart-workflow.com/invite/${token}`;

  const handleCopy = () => {
    Clipboard.setString(Invite_Link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = async () => {
    if (!email) return;
    setloading(true);

    const result = await sendInvite(email, orgId, token);

    setloading(false);

    if (result.success) {
      Alert.alert("Invite bhej diya!", `${email} ko email mil jayega.`);
    } else {
      Alert.alert("Error", result.error ?? "Kuch masla hua, dobara try karo.");
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="p-5">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: 27, fontWeight: "700" }}>Team</Text>
          <TouchableOpacity
            className="flex-row gap-4 bg-primary px-3 py-3 rounded-lg mt-2"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="people-outline" size={20} color={"white"} />
            <Text className="text-surface">Add Member</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-secondary text-xl relative bottom-4">
          5 team members
        </Text>
        <View className="flex-row gap-5 flex-wrap">
          <View className="flex-row justify-between w-[48%] bg-gray-200 p-4 rounded-xl mt-5">
            <View className="gap-2">
              <Text className="text-xl text-secondary">Active Task</Text>
              <Text className="text-xl font-bold">17</Text>
            </View>
            <View className="mt-4">
              <Ionicons name="calendar-clear-outline" size={26} />
            </View>
          </View>
          <View className="flex-row justify-between w-[46%] bg-gray-200 p-4 rounded-xl mt-5">
            <View className="gap-2">
              <Text className="text-xl text-secondary">Completed</Text>
              <Text className="text-xl font-bold">114</Text>
            </View>
            <View className="mt-4">
              <Ionicons name="trending-up" size={26} />
            </View>
          </View>
        </View>
        <Text className="mt-4 text-[20px] font-bold">Departments</Text>
        <View className="flex-row gap-3 flex-wrap mt-7">
          {departments.map((item, index) => (
            <Text
              key={index}
              className="text-[13px] bg-primary text-surface px-4 py-1 rounded-full text-center"
            >
              {item} (1)
            </Text>
          ))}
        </View>
        <View className="mt-7">
          <Text className="text-[20px] font-bold">Team members</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 350 }}
        >
          {TeamMembers &&
            TeamMembers.map((item) => (
              <View key={item.id} className="mt-7 border rounded-lg p-5">
                <View className="flex-row w-full">
                  <View className="w-12 h-12 bg-primary rounded-full">
                    <Text className="text-surface text-center mt-3">
                      {item.username.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <View className="ml-5">
                    <Text className="text-xl">{item.username}</Text>
                    <Text className="text-secondary">{item.Post}</Text>
                    <View className="flex-row gap-3">
                      <Text className="w-[47px] py-1 mt-1 bg-primary rounded-full text-white text-center">
                        {item.active}
                      </Text>
                      <Text className="mt-2">{item.department}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="relative left-24">
                    <Ionicons name="ellipsis-vertical" size={20} />
                  </TouchableOpacity>
                </View>
                <View className="flex-row w-full justify-between">
                  <View className="flex-row gap-5">
                    <View className="mt-4">
                      <Text className="text-center text-lg">
                        {item.activetask}
                      </Text>
                      <Text className="text-center text-lg">Active</Text>
                    </View>
                    <View className="mt-4">
                      <Text className="text-center text-lg">
                        {item.Completed}
                      </Text>
                      <Text className="text-center text-lg">Completed</Text>
                    </View>
                  </View>
                  <View className="flex-row gap-5 relative top-8">
                    <Ionicons name="chatbox-outline" size={20} />
                    <Ionicons name="mail-outline" size={20} />
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center px-4"
          onPress={() => setModalVisible(false)}
        >
          <Pressable className="bg-white w-full rounded-2xl p-5">
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <Text className="text-base font-bold">Add Team Member</Text>
                <Text className="text-sm mt-0.5">
                  Invite someone to join organization
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={20} />
              </TouchableOpacity>
            </View>

            <Text className="text-sm mb-2">Invite via link</Text>
            <View className="flex-row gap-2 items-center mb-1">
              <View className="flex-1 rounded-lg px-3 py-2">
                <Text className="text-sm">{Invite_Link}</Text>
              </View>
              <TouchableOpacity
                className="border border-gray-300 px-3 py-2 rounded-lg"
                onPress={handleCopy}
              >
                <Text className="text-sm font-medium">
                  {copied ? "Copied" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>
            {copied && (
              <Text className="text-xs text-green-600 mb-2">
                Link Copied to Clipboard
              </Text>
            )}

            {/* Divider */}
            <View className="border-t border-gray-200 my-3" />

            {/* Email Invite */}
            <Text className="text-sm mb-2 text-gray-500">
              Or invite via email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="member@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3"
            />
            <TouchableOpacity
              className="bg-primary py-3 rounded-lg items-center"
              onPress={handleSendInvite}
            >
              <Text className="text-white font-medium text-sm">
                Send Invite
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default Team;
