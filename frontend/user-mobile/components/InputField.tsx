import { View, TextInput, Text } from "react-native";


export function InputField({ type, placeholder, label, value, onChangeText } : any) {

  return (
    <View className="w-10/12 my-2">
      <Text className="font-subheading text-white px-2">{ label }</Text>
      <TextInput
        className="border border-glow rounded-lg px-4 h-12 w-full text-white"
        placeholderTextColor="#9ca3af"
        placeholder={placeholder}
        textContentType={type}
        secureTextEntry={type === "password" ? true : false}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}