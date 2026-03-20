import { Text, View } from "react-native";

interface DetailsPanelProps {
    title: string
    content: string
}

export function DetailsPanel ({ title, content }:DetailsPanelProps ) {

    return (
        <View className="px-4"
            style={{ borderLeftWidth: 1, 
        borderLeftColor: "#FF8C42",}}>
            <Text className="font-subheading text-white text-lg">{ title }</Text>
            <Text className="font-sans font-bold text-white text-lg">{ content }</Text>
        </View>
    )
}