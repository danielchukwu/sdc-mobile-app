import { Text, View } from "react-native";
import { ShowMoreButton } from "./button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TOffender } from "@/app/(app)/dummy_data";
import { TOffenderSchema } from "@/lib/types";

export const OffenderCard = ({offender} : {offender: TOffender | TOffenderSchema}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View className='p-4 border border-gray-200 rounded-lg'>
      {/* Title */}
      <Text className='text-black/80 text-lg font-medium'>{offender.name}</Text>
      <Text className='text-black/50'>{offender.matricNo}</Text>
      {/* Email */}
      <Text className='text-black/50'>{offender.email}</Text>
      {/* Description */}
      <View className='pt-2'>
        <Text className={cn('text-black/80', {'line-clamp-1': !showMore})}>
          {!showMore ? offender.statement.slice(0, 45) : offender.statement}{!showMore && offender.statement.length > 45 ? '...' : ''}
        </Text>
        {offender.statement.length > 45 && <ShowMoreButton 
          text={offender.statement}
          limit={45}
          showMore={showMore}
          updateShowMore={setShowMore}
        />}
      </View>
    </View>
  );
}