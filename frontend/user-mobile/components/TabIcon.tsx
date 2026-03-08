import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text } from "react-native";

export function TabIcon({ focused, icon, title }: any) {

    if (focused) {

        return (
            <View className="items-center justify-center min-w-[100px]">
                <MaterialIcons name={icon} size={28} color="#FF8C42"
                    style={{ textShadowColor: "#FF8C42", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}
                    />
                <Text className="font-heading text-xs shadow-glow text-glow"
                    style={{ textShadowColor: "#FF8C42", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}
                    >{title}</Text>
            </View>                 
        )   
    }

    return (
        <View className="items-center justify-center min-w-[100px]">
            <MaterialIcons name={icon} size={24} color="#4B4B4B" />
            <Text className="font-heading text-xs text-gray">{title}</Text>
        </View>            
    )  

}