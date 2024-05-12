import { AppButton } from '@/components/button';
import { FormInput } from '@/components/input';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, Keyboard, Text, View } from 'react-native';
let render = 0;
const Login = () => {
  const {control, handleSubmit} = useForm();
  const keyboardIsOpen = useKeyboardIsOpen();

  const onSubmit = (data: FieldValues) => {
    Alert.alert(JSON.stringify(data));
  }
  render++;
  console.log(render);

  return (
      <View className='flex-1 justify-center bg-white px-5'>
        {/* FIXME: This line causes a jank in the UI when keyboard is open, use animation to fix */}
        <View style={{paddingBottom: !keyboardIsOpen ? 128 : 0}}>
          {/* Welcome text */}
          <View className='gap-2'>
            <Text className='text-cc-primary-main text-center font-bold text-4xl'>Welcome</Text>
            <Text className='text-gray-500 text-center'>Enter credentials to continue managing bingham cases today.</Text>
          </View>

          {/* Input and login button */}
          <View className='gap-2 pt-10'>
            <FormInput name='email' placeholder='Email' control={control} />
            <FormInput name='password' placeholder='Password' control={control} />
          </View>

          {/* Button */}
          <View className='pt-5'>
            <AppButton onPress={handleSubmit(onSubmit)}>
              <Text className='text-white font-bold'>Login</Text>
            </AppButton>
          </View>
        </View>
      </View>
  )
}

export default Login;

const useKeyboardIsOpen = () => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardIsOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardIsOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardIsOpen;
}