import "../global.css";
import { Stack } from "expo-router";

export default function Layout() {
  // return <Slot />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "SDC App", statusBarColor: "#fff", headerTitleAlign: 'center', headerShadowVisible: false }} />
    </Stack>
  );
}
