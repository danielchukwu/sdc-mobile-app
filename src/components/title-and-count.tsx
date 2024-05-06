import { Text } from "react-native";
import { View } from "react-native";

export const TitleAndCount = ({title, count} : {title: string, count: number}) => {
  return (
    <View className='flex-row gap-2'>
      <Text className='text-black/80 font-medium text-lg'>{title}</Text>
      <Text className='text-black/50 text-lg'>{count}</Text>
    </View>
  );
}