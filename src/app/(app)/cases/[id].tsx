import { View, ScrollView, FlatList, Text, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { DemoCase, TCase, TOffender } from '../dummy_data';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TitleAndCount } from '@/components/title-and-count';
import { cn } from '@/lib/utils';
import { ShowMoreButton } from '@/components/button';
import { OffenderCard } from '@/components/cards';
import axios from 'axios';
import { TCaseSchema } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from "@/components/loading-screen";

const SingleCase = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const { data, isPending, isLoading, error} = useQuery({
    queryKey: ['cases', id],
    queryFn: async () => {
      const res = await axios.get(`https://sdc-app-bk.vercel.app/api/cases/${id}`);
      console.log({data: res.data});
      return res.data as TCaseSchema;
    }
  });
  const [showMore, setShowMore] = useState(false);

  if (isPending || isLoading) return (<LoadingScreen />);
  if (error) return (<Text>An error occured: {error.message}</Text>);

  return (
    <View className='flex-1 bg-white'>
      <ScrollView>
        <View className='px-5 pt-10'>
          {/* Top */}
          <View className='gap-5'>
            {/* title */}
            <Text className='font-bold text-black/80 text-2xl'>{data.title}</Text>
            {/* location */}
            <View className='flex-row gap-2'>
              <FontAwesome5 name="map-marker-alt" size={16} color="gray" />
              <Text className="text-black/50">{data.location}</Text>
            </View>
            {/* description */}
            <View className='gap-2'>
              <Text className='text-lg text-black/60'>{!showMore ? data.description?.slice(0,400) : data.description}{!showMore && data.description?.length > 400 ? '...' : ''}</Text>
              <ShowMoreButton 
                text={data.description}
                limit={400}
                showMore={showMore}
                updateShowMore={setShowMore}
              />
            </View>
          </View>

          {/* Offenders */}
          <View className="pt-7 pb-32">
            {/* Header */}
            <TitleAndCount title='Offenders' count={data.offenders?.length} />
            
            {/* List [offenders] */}
            <View className="gap-2 pt-5">
              {data.offenders?.map((item, i) => (
                <OffenderCard key={i} offender={item} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <CaseNavbar /> */}
    </View>
  );
}

export default SingleCase;


const CaseNavbar = () => {
  return (
    <View className="absolute w-full bottom-0 left-0 px-3 pt-2 pb-3 bg-white border-t border-gray-100">
      <View className="flex-row gap-2 justify-stretch flex-gap-2">

        {/* Left Row */}
        <CaseNavButton className='flex-1'>
          <View className='flex-row gap-2 items-center'>
            <Entypo name="chevron-small-left" size={24} color="black" />
            <Text className='font-medium text-lg'>Left</Text>
          </View>
        </CaseNavButton>
        {/* Right Row */}
        <CaseNavButton className='flex-1'>
          <View className='flex-row gap-2 items-center'>
            <Text className='font-medium text-lg'>Right</Text>
            <Entypo name="chevron-small-right" size={24} color="black" />
          </View>
        </CaseNavButton>

      </View>
    </View>
  );
}

const CaseNavButton = ({children, className} : {children: React.ReactNode, className?: string}) => {
  return (
    <View className={cn('bg-slate-100 border border-gray-300 py-5 rounded-lg items-center justify-center', className)}>
      {children}
    </View>
  );
}