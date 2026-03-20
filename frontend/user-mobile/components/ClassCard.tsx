import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface ClassCardProps {
    classId: number
    section: string
    teacher: string
    subject: string
    department: string
    start_time: string
    end_time: string
    computer_labs: {
        lab_name: string
    }
}

export function ClassCard ({classId, section, teacher, subject, department, start_time, end_time, computer_labs }: ClassCardProps) {

    const router = useRouter();

    return (
        <View className="border border-glow rounded-xl p-5 my-2">
            <Text className="text-white font-heading text-2xl" >{ computer_labs.lab_name }</Text>
            <Text className="text-white font-sans">{`${ teacher } - ${ department }`}</Text>
            <Text className="text-white">{subject}</Text>
            <Text className="text-white">{section}</Text>
            <Text className="text-white">{ `${start_time} - ${end_time}` }</Text>
            <TouchableOpacity onPress={() => router.push({ pathname : "/lab_class/[class_id]", params: {class_id: classId} })}>
                <Text className="text-glow">View Class →</Text>
            </TouchableOpacity>
        </View>
    )

}