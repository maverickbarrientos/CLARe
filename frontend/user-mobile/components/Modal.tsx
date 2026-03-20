import { Modal as RNModal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

interface ModalProps {
    type: 'success' | 'error' | 'loading'
    title: string
    subTitle?: string
    visible: boolean
    onClose?: () => void
}

export function Modal({ type, title, subTitle, visible, onClose }: ModalProps) {
    return (
        <RNModal transparent animationType="fade" visible={visible}>
            <View className="flex-1 bg-black/70 items-center justify-center">
                <View className="bg-black border border-[#FFB366] rounded-2xl p-5 w-72 items-center gap-4">

                    {(type === 'success' || type === 'error') && (
                        <TouchableOpacity onPress={onClose} className="absolute top-3 right-3">
                            <Text className="text-white/40 text-base">✕</Text>
                        </TouchableOpacity>
                    )}

                    {type === 'error' && (
                        <View className="w-16 h-16 rounded-full bg-[#3d0a0a] items-center justify-center">
                            <View className="w-12 h-12 rounded-full bg-[#5c1010] items-center justify-center">
                                <View className="w-9 h-9 rounded-full bg-[#c0272d] items-center justify-center">
                                    <Text className="text-white font-bold text-lg">!</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {type === 'success' && (
                        <View className="w-16 h-16 rounded-full bg-[#0a1f0a] items-center justify-center">
                            <View className="w-12 h-12 rounded-full bg-[#0f2e0f] items-center justify-center">
                                <View className="w-9 h-9 rounded-full bg-[#1a5c1a] items-center justify-center">
                                    <Text className="text-green-400 font-bold text-lg">✓</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <View className="items-center gap-1">
                        <Text className="text-white font-bold text-center">{title}</Text>
                        {subTitle && (
                            <Text className="text-white/50 text-xs text-center">{subTitle}</Text>
                        )}
                    </View>

                    {type === 'loading' && (
                        <ActivityIndicator color="#FF6E01" size="small" />
                    )}

                </View>
            </View>
        </RNModal>
    )
}