import { ShowMoreButton } from '@/components/button';
import { OffenderCard } from '@/components/cards';
import { TitleAndCount } from '@/components/title-and-count';
import { cn } from '@/lib/utils';
import { useCasesStore } from '@/store';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const SingleCase = () => {
  // get selected case 
  const casesZ = useCasesStore((store) => store.cases);
  const selectedCaseIndex = useCasesStore((store) => store.selectedIndex);
  const data = useMemo(() => casesZ[selectedCaseIndex], []);
  
  const [showMore, setShowMore] = useState(false);


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

      <CaseNavbar />
    </View>
  );
}

export default SingleCase;


const CaseNavbar = () => {
  const cases = useCasesStore((store) => store.cases);
  const selectedIndex = useCasesStore((store) => store.selectedIndex);
  const updateSelectedIndex = useCasesStore((store) => store.updateSelectedIndex);

  // nav indexes
  const leftIndex = selectedIndex > 0 ? selectedIndex-1 : null;
  const rightIndex = selectedIndex < (cases.length-1) ? selectedIndex+1 : null;
  
  // helper funcitons
  const onNavClick = (caseIndex: number) => {
    if (caseIndex) {
      updateSelectedIndex(caseIndex)
      router.replace(`/cases/${cases[caseIndex].id}`);
    }
  }
  return (
    <View className="absolute w-full bottom-0 left-0 px-3 pt-2 pb-3 bg-white #border-t #border-gray-100">
      <View className="flex-row gap-2 justify-stretch flex-gap-2">

        {/* Left Row */}
        <CaseNavButton className={cn('flex-1', {'opacity-50': leftIndex === null})} >
          <Pressable onPress={() => onNavClick(leftIndex)}>
            <View className='flex-row gap-2 items-center'>
              <Entypo name="chevron-small-left" size={24} color="black" />
              <Text className='font-medium text-lg'>Left</Text>
            </View>
          </Pressable>
        </CaseNavButton>
        {/* Right Row */}
        <CaseNavButton className={cn('flex-1', {'opacity-50': rightIndex === null})}>
          <Pressable onPress={() => onNavClick(rightIndex)}>
            <View className='flex-row gap-2 items-center'>
              <Text className='font-medium text-lg'>Right</Text>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </View>
          </Pressable>
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