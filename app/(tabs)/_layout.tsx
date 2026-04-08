import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserProvider, { UserContext } from "@/context/UserContext";

const _layout = () => {
  const { isLoggedIn, loading } = useContext(UserContext);
  const router = useRouter();

  if (loading) {
    return null;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/signin");
    }
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "checkmark" : "checkmark-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: "Team",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
