import { AppButton, CancelModalButton } from "@/components/button";
import { OffenderCard } from "@/components/cards";
import { FormInput } from "@/components/input";
import { FormErrorText } from "@/components/texts";
import { TitleAndCount } from "@/components/title-and-count";
import { CaseSchema, TCaseSchema, TOffenderSchema } from '@/lib/types';
import { cn } from "@/lib/utils";
import { useCaseFormOffendersStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from "@/app/_layout";

type TCase = '' | 'criminal' | 'civil' | 'hostel';


const CaseForm = () => {
  // state
  const {control, formState: {errors}, getValues, setValue, clearErrors, handleSubmit} = useForm<TCaseSchema>({
    resolver: zodResolver(CaseSchema),
  });
  const offendersList = useCaseFormOffendersStore((state) => state.offenders);

  const {mutate: createCase, } = useMutation({
    mutationFn: async (data: TCaseSchema) => {
      const res = await axios.post('https://sdc-app-bk.vercel.app/api/cases', data);
      return res.data;
    },
    onError: (error) => {
      console.log('Error', error.message);
    },
    onSuccess: (data) => {
      console.log('Success', data);
      queryClient.invalidateQueries({queryKey: ['cases']});
      router.replace('/');
    }
  });

  const updateCaseType = (value: TCase) => {
    setValue('type', value);
    clearErrors('type');
  }

  // update offenders once it is added to the store
  useEffect(() => {
    if (offendersList.length) {
      setValue('offenders', offendersList);
      clearErrors('offenders');
    }
  }, [offendersList]);

  const onSubmit = async (data: TCaseSchema) => {
    console.log(data);
    createCase(data);
  }
  
  return (
    <View className="bg-white justify-between flex-1">
      {/* ❌ */}
      <View className="flex-row justify-end px-2 pt-10">
        <CancelModalButton />
      </View>

      <ScrollView className="">

        <View className="p-5 pt-10 pb-5 gap-5">
          {/* Title */}
          <FormInput
            autoFocus
            name='title'
            control={control}
            placeholder="Case title"
            className="font-bold text-2xl text-black/80 bg-white border-none"
            disableDefaultClass
            />
            <FormErrorText text={errors.title?.message} />
          {/* Description */}
          <FormInput
            name='description'
            control={control}
            placeholder="Add description..."
            className="text-black/70 bg-white border-none"
            disableDefaultClass
            />
            <FormErrorText text={errors.description?.message} />

        </View>
        {/* Location */}
        <View className="border-y border-gray-200 p-5">
          <FormInput
            name='location'
            control={control}
            placeholder="Location"
            className="text-black/70 bg-white border-none"
            disableDefaultClass
          />
          <FormErrorText text={errors.location?.message} />
        </View>
        {/* Type */}
        <View className="border-b border-gray-200 px-5 py-2">
          <View className="flex-row items-center">
            <Text className="text-black/50 mr-5">Type</Text>
            <View className="flex-row flex-wrap gap-2">
              <CaseTypePill isSelected={getValues('type') === 'criminal'} caseTypeColor='bg-red-500' updateSelect={() => updateCaseType('criminal')}>Criminal</CaseTypePill>
              <CaseTypePill isSelected={getValues('type') === 'civil'} caseTypeColor='bg-yellow-500' updateSelect={() => updateCaseType('civil')}>Civil</CaseTypePill>
              <CaseTypePill isSelected={getValues('type') === 'hostel'} caseTypeColor='bg-gray-500' updateSelect={() => updateCaseType('hostel')}>Hostel</CaseTypePill>
            </View>
          </View>

          <FormErrorText text={errors.type?.message} />
        </View>

        {/* Offenders */}
        <View className="p-5">
          <TitleAndCount title='Offenders' count={offendersList.length} />

          <View className="gap-2 pt-5">
            {offendersList.map((item, i) => (
              <OffenderCard key={i} offender={item} />
            ))}
          </View>

          <FormErrorText text={errors.offenders?.message} />

          <View className="pt-5">
            <View className="w-32 bg-slate-200 rounded-lg border border-slate-300 overflow-hidden">
              <Pressable 
                onPress={() => router.push('/cases/add-offender')} 
                className="px-1 py-2 items-center " android_ripple={{color: "#c5c5c5", }}>
                <Text>Add Offender</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Submit button */}
      <View className="p-5 pt-2 pb-5  border-t border-gray-200">
        <AppButton onPress={handleSubmit(onSubmit)}>
          <Text className="text-white font-bold">Create case</Text>
        </AppButton>
      </View>
    </View>
  );
};

export default CaseForm;

const CaseTypePill = (props : {isSelected: boolean, updateSelect: () => void, children: React.ReactNode, caseTypeColor: string}) => {
  return (
    <View className={cn("border border-gray-200 rounded-full", {'bg-cc-primary-main border-none': props.isSelected})}>
      <Pressable onPress={props.updateSelect} android_ripple={{color: '#f5f5f5'}} className="px-4 py-3">
        <View className="flex-row items-center justify-center gap-2">
          <View className={cn("h-3 w-3 rounded-full", props.caseTypeColor)}></View>
          <Text className={cn("", {'text-white': props.isSelected})}>{props.children}</Text>
        </View>
      </Pressable>
    </View>
  );
}