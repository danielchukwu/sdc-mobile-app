import { Text } from "react-native";

export const FormErrorText = ({text} : {text?: string}) => {
  if (!text) return <></>;

  return <Text className="text-red-500 text-sm">{text}</Text>
}