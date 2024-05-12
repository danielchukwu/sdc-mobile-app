import { Link, Stack } from "expo-router";
import { Alert, Text} from 'react-native';
export default function Layout() {
  Alert.alert('Send money...')
  return (
    <Stack screenOptions={{statusBarColor: "#fff", headerTitleAlign: 'center', headerShadowVisible: false}}>
      <Stack.Screen name="index" options={{ headerTitle: (data) => (<Text className="text-cc-primary-main text-xl font-semibold">SDC APP</Text>), headerRight: (props) => (
        <Link href={'/_sitemap'}>SM</Link>
        // <></>
      ) }} />
      <Stack.Screen name="cases" options={{ headerShown: false }} />
    </Stack>
  );
}
