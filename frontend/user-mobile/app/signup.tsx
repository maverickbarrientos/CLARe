import { Image, 
        Text, 
        View, 
        TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Logo } from "@/constants/images"
import { InputField } from '@/components/InputField'
import { useRouter } from 'expo-router'
import { useRegister } from '@/hooks/useRegister'

type FormState = {
  user: {
    email: string
    password: string
  }
  user_information: {
    first_name: string
    last_name: string
    department: string
  }
}

const SignUp = () => {
  const router = useRouter();
  const { signUpUser, error, loading } = useRegister();
  const [form, setForm] = useState<FormState>({
    user: {
      email: "",
      password: ""
    },
    user_information: {
      first_name: "",
      last_name: "",
      department: ""
    }
  });

  function handleChange(section: keyof FormState, field: string, value: string) {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }

  const handleSubmit = async () => {
    signUpUser(form)
  }

  return (
    <SafeAreaProvider>
      <View className='flex-1 justify-center'>
        <View className='items-center my-5'>
          <Image source={Logo.logo} style={{ width: 175, height: 60 }} />
          <Text className='text-white text-center my-2 text-2xl font-heading'>Sign Up</Text>
        </View>

        <View className='items-center px-4'> 
          <InputField type="name" placeholder="John" label="First Name *" onChangeText={(text : string) => handleChange("user_information", "first_name", text)}/>
          <InputField type="name" placeholder="Doe" label="Last Name *" onChangeText={(text: string) => handleChange("user_information", "last_name", text)}/>
          <InputField type="name" placeholder="CITE" label="Department *" onChangeText={(text: string) => handleChange("user_information", "department", text)}/>
          <InputField type="emailAddress" placeholder="johndoe@example.com" label="Email *" onChangeText={(text: string) => handleChange("user", "email", text)}/>
          <InputField type="password" placeholder="●●●●●●" label="Password *" onChangeText={(text : string) => handleChange("user", "password", text)}/>
          <InputField type="password" placeholder="●●●●●●" label="Confirm Password *"/>
        </View>

        <View className='items-center px-4 my-5'>
          <TouchableOpacity onPress={handleSubmit}
            className='border w-10/12 border-glow shadow-glow bg-glow rounded-lg py-2'>
            <Text className='text-white text-center font-heading'>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row justify-center items-center align-middle mt-6'>
          <Text className='text-white'>
            {`Already have an account? `}
            <Text onPress={() => router.push("/")} className='text-glow'>Login</Text>
          </Text>
        </View>

      </View>
    </SafeAreaProvider>
  )
}

export default SignUp