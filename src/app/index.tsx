import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Text, TextInput, TextInputProps, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      {/* Search button */}
      <View className="px-4 py-2 border-b border-gray-200">
        <IconInput
          placeholder="Search for cases..."
          icon={
            <Ionicons
              name="search"
              size={18}
              color="gray"
              className="absolute left-5 top-1/2 "
              style={{ transform: [{ translateY: -18 / 2 }] }}
            />
          }
        />
      </View>

      {/* Container */}
      <View>
        {/* Cases */}
        <FlatList 
          data={Array.from({ length: 10 })}
          keyExtractor={(data, index) => index.toString()}
          renderItem={(data) => (<CaseItem />)}
        />
      </View>
    </View>
  );
}

const CaseItem = () => {
  return (
    <View className="flex-row space-x-2 px-4 py-4 gap-3 border-b border-gray-200">
      {/* type */}
      <View className="h-3 w-3 bg-red-500 rounded-full mt-2"></View>

      {/* content */}
      <View className="flex-1">
        <Text className="font-semibold text-gray-900 text-xl">Caught 4 boys smoking</Text>
        <View className=" flex-row justify-between pt-2">
          <Text className="text-zinc-500">5 offenders . Old boys hostel</Text>
          <Text className="text-zinc-500">May 11th, 2024</Text>
        </View>
      </View>
    </View>
  )
}

const IconInput = ({
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

const Input = ({ className, placeholder, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      className="p-3 pl-14 pr-5 rounded-lg border border-gray-200 text-lg"
      placeholder={placeholder}
    />
  );
};

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Welcome to Project ACME
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Discover and collaborate on amce. Explore our services now.
            </Text>

            <View className="gap-4">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Explore
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          ACME
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6">
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Product
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Pricing
          </Link>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © {new Date().getFullYear()} Me
        </Text>
      </View>
    </View>
  );
}
