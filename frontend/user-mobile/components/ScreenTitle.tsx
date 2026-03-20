import { Image, Text, View, TouchableOpacity } from "react-native"
import { Images } from "@/constants/images"
import { useCurrentDate } from "@/hooks/useCurrentDate"
import { dateFormatter } from "@/utilities/dateUtils"
import { useRouter } from "expo-router"

export function ScreenTitle({ pageTitle, userName }: { pageTitle: string, userName?: string }) {

    const currentDate = useCurrentDate();
    const router = useRouter()

    const initials = userName
        ? userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    return (
        <View className="my-5">
            <View className="flex-row items-center my-7">
                <Image source={Images.logo} style={{ width: 50, height: 50 }} />
                <Text className="color-white font-heading text-2xl flex-1 text-center">{pageTitle}</Text>
                <TouchableOpacity onPress={() => router.push("/user")}
                    style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: 13 }}>{initials}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text className="color-white font-heading">{dateFormatter(currentDate)}</Text>
            </View>
        </View>
    )
}