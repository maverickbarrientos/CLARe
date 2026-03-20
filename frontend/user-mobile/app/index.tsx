import { Image, 
        Text, 
        View, 
        TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Logo } from "@/constants/images"
import { InputField } from '@/components/InputField'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'

const Index = () => {

  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)/home');
    } catch (err: any) {
      setError(err?.response?.data?.detail);
    }
  } 

  if (error) console.log(error);

  return (
    <SafeAreaProvider>
      <View className='flex-1 justify-center'>
        <View className='items-center my-5'>
          <Image source={Logo.logo} style={{ width: 175, height: 60 }} />
          <Text className='text-white text-center my-2 text-2xl font-heading'>Login</Text>
        </View>

        <View className='items-center px-4'> 
          <InputField type="emailAddress" value={email} onChangeText={setEmail}
                placeholder="johndoe@example.com" label="Email *" />
          <InputField type="password" value={password} onChangeText={setPassword}
                placeholder="●●●●●●" label="Password *"/>
          <View className="w-10/12 items-end px-4 my-2">
            <TouchableOpacity>  
              <Text className='text-glow font-sans'>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className='items-center px-4 my-5'>
          <TouchableOpacity onPress={handleLogin}
            className='border w-10/12 border-glow shadow-glow bg-glow rounded-lg py-2'>
            <Text className='text-white text-center font-heading'>LOGIN</Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <View className='items-center px-4'>
            <Text className='text-red-500 text-sm'>{error}</Text>
          </View>
        ) : null}

        <View className='flex-row justify-center items-end w-10/12 align-middle mt-6'>
          <Text className='text-white'>
            {`Don't have an account? `}
            <Text onPress={() => router.push("/signup")} className='text-glow' >Sign Up</Text>
          </Text>
        </View>

      </View>
    </SafeAreaProvider>
  )
}

export default Index