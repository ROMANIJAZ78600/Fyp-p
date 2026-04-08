import { Stack, useRouter } from "expo-router";
import "@/global.css";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Text, View } from "react-native";
import UserProvider, { UserContext } from "@/context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";
export default function RootLayout() {
  const router = useRouter();

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup"
          options={{
            title: "Create Account",
            headerTitleStyle: { fontWeight: 600 },
            headerLeft: () => (
              <View>
                <Ionicons
                  name="arrow-back"
                  size={26}
                  onPress={() => router.back()}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            title: "Sign In",
            headerTitleStyle: { fontWeight: 600 },
            headerLeft: () => (
              <View>
                <Ionicons
                  name="arrow-back"
                  size={26}
                  onPress={() => router.back()}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="createtask"
          options={{ title: "Create New Task" }}
        />
        <Stack.Screen
          name="createorganization"
          options={{ title: "Create Your Organization" }}
        />
        <Stack.Screen
          name="info"
          options={{ title: "Profile", headerTitleAlign: "center" }}
        />
      </Stack>
    </UserProvider>
  );
}
