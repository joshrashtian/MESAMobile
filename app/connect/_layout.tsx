import { Stack } from "expo-router";

export default function RootConnectLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" />
      <Stack.Screen name="Post/[id]" options={{ presentation: "modal" }} />
    </Stack>
  );
}
