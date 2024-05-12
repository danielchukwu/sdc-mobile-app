import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { AppButton, CancelModalButton } from '@/components/button';
import { FormInput } from '@/components/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OffenderSchema, TOffenderSchema } from '@/lib/types';
import { FormErrorText } from '@/components/texts';
import { useCaseFormOffendersStore } from '@/store';
import { router, useLocalSearchParams } from 'expo-router';

const AddOffender = () => {
  const {control, getValues, formState: {errors}, handleSubmit} = useForm<TOffenderSchema>({
    resolver: zodResolver(OffenderSchema)
  });
  const updateStore = useCaseFormOffendersStore((state) => state.update);
  const params = useLocalSearchParams();
  console.log({params});

  const onSubmit = () => {
    // offenders
    const data: TOffenderSchema = {
      name: getValues('name'),
      matricNo: getValues('matricNo'),
      email: getValues('email'),
      statement: getValues('statement'),
    }
    // update store
    updateStore(data);
    router.back();
  }

  return (
    <View className='bg-black/20 flex-1 justify-center items-center'>
      <StatusBar />
      {/* Modal */}
      <View className="bg-white w-[95%] p-5 pt-2 rounded-lg shadow-lg">
        {/* title */}
        <View className="flex-row items-center justify-between">
          <Text className='text-black/50'>New offender</Text>
          <CancelModalButton />
        </View>

        {/* Form */}
        <View className="gap-2 py-5">
          {/* Name */}
          <FormInput 
            name='name'
            placeholder='Full name'
            control={control}
          />
          <FormErrorText text={errors.name?.message} />

          <FormInput 
            name='email'
            placeholder='Email'
            control={control}
          />
          <FormErrorText text={errors.email?.message} />

          <FormInput 
            name='matricNo'
            placeholder='Matric Number'
            control={control}
          />
          <FormErrorText text={errors.matricNo?.message} />

          <FormInput 
            name='statement'
            placeholder='Statement'
            control={control}
          />
          <FormErrorText text={errors.statement?.message} />

        </View>

        {/* Button */}
        <AppButton onPress={handleSubmit(onSubmit)} className='bg-slate-200 border border-slate-300' pressableClassName='py-4'>
          <Text className='text-black/70 font-bold'>Add offender</Text>
        </AppButton>
      </View>
    </View>
  );
}

export default AddOffender