import { router } from "expo-router";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

type AppButtonProps = {
  children: React.ReactNode;
  className?: string;
  pressableClassName?: string;
  onPress: (event: GestureResponderEvent) => void;
};
export const AppButton = ({ children, onPress, className, pressableClassName }: AppButtonProps) => {
  return (
    <View className={cn("w-full bg-cc-primary-main rounded-lg", className)}>
      <Pressable onPress={onPress} className={cn("flex-row justify-center py-5", pressableClassName)} android_ripple={{color: '#a5a5a5'}}>
        {children}
      </Pressable>
    </View>
  );
};

type ShowMoreButtonProps = {
  text: string;
  limit: number;
  showMore: boolean;
  updateShowMore: (v: boolean) => void;
};

export const ShowMoreButton = ({
  text,
  limit,
  showMore,
  updateShowMore,
}: ShowMoreButtonProps) => {
  return (
    <>
      {!showMore && text.length > limit ? (
        <Pressable onPress={() => updateShowMore(true)}>
          <Text className="text-blue-500">Show more</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => updateShowMore(false)}>
          <Text className="text-blue-500">Show less</Text>
        </Pressable>
      )}
    </>
  );
};

export const CancelModalButton = () => {
  return (
    <Pressable onPress={() => router.back()} android_ripple={{color: '#c5c5c5'}} className="p-3 rounded-lg">
      <Fontisto name="close-a" size={16} color="#a5a5a5" />
    </Pressable>
  );
}