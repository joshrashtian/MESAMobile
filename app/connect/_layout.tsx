import { Stack } from "expo-router";

export default function RootConnectLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ presentation: "modal" }} />
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
    </Stack>
  );
}
