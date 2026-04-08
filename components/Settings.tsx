import { View, Text } from "react-native";
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { UserContext } from "@/context/UserContext";

const Settings = () => {
  const { logout } = useContext(UserContext);
  const items = [
    { icon: "create-outline", title: "Edit Profile" },
    { icon: "notifications-outline", title: "Notifications" },
    { icon: "settings-outline", title: "Settings" },
    { icon: "shield-outline", title: "Privacy & Security" },
    { icon: "analytics-outline", title: "Analytics" },
    { icon: "exit-outline", title: "Sign Out" },
  ];
  return (
    <View className="mt-3">
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Settings</Text>
      {items.map((item, index) => (
        <View key={index} className="mt-3">
          <View className="w-full border rounded-[15px] p-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Ionicons name={item.icon} size={20} />
              {item.title === "Sign Out" ? (
                <Text
                  className="font-bold text-xl text-red-500"
                  onPress={logout}
                >
                  Sign Out
                </Text>
              ) : (
                <Text className="font-bold text-xl">{item.title}</Text>
              )}
            </View>

            <View className="bg-gray-700 w-10 h-10 rounded-full items-center justify-center">
              <Ionicons name="chevron-forward" size={15} color="blacl" />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Settings;
