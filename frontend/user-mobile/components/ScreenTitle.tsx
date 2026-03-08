import { Image, Text, View } from "react-native"
import { Images } from "@/constants/images"
import { useCurrentDate } from "@/hooks/useCurrentDate"
import { dateFormatter } from "@/utilities/dateUtils"

export function ScreenTitle ({ pageTitle }: { pageTitle: string }) {

    const currentDate = useCurrentDate();

    return (
        <View className="">
            <Image source={Images.logo} style={{ width: 175, height: 60 }} />
            <View className="my-5">    
                <Text className="color-white font-subheading text-4xl">{ pageTitle }</Text>
                <Text className="color-white font-subheading">{ dateFormatter(currentDate) }</Text>
            </View>
        </View>
    )

}