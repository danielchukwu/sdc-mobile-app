import { cn } from "@/lib/utils";
import { useController, type Control, type FieldValues } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";

export const IconInput = ({
  icon,
  ...props
}: TextInputProps & { icon: React.ReactNode }) => {
  return (
    <View className="relative">
      {icon}
      <Input {...props} />
    </View>
  );
};

export const Input = ({ className, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      className="p-3 pl-14 pr-5 rounded-lg border border-gray-200 text-lg"
    />
  );
};

type FormInputProps = TextInputProps & {name: string, control: Control<FieldValues, any>, disableDefaultClass?: boolean};
export const FormInput = ({ className, name, control, disableDefaultClass=false, ...props }: FormInputProps) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name
  });

  return (
    <TextInput
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      className={cn({"py-3 px-5 rounded-lg border border-gray-200 text-lg": !disableDefaultClass}, className)}
    />
  );
};

