import { ActivityIndicator } from "react-native";
import { View } from "react-native";

export const LoadingScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white border-t border-black/5">
      <ActivityIndicator className="w-12 h-12 text-cc-primary-main" />
    </View>
  );
}