import { Text, View, TouchableOpacity } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { ScreenTitle } from '@/components/ScreenTitle'
import { DetailsPanel } from '@/components/DetailsPanel'

const UserProfile = () => {
  const { user, logout } = useAuth();

  const capitalize = (str?: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  if (!user) return null;

  return (
    <View className='p-5 flex-1'>
      <ScreenTitle pageTitle="My Profile" />

      <View className='my-2'>
        <Text className="color-white font-subheading text-2xl">User Information</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
          <View style={{ width: '100%', paddingVertical: 8, paddingRight: 12 }}>
            <DetailsPanel title="Email" content={user.email} />
          </View>
          <View style={{ width: '50%', paddingVertical: 8, paddingRight: 12 }}>
            <DetailsPanel title="First Name" content={capitalize(user.users_information.first_name)} />
          </View>
          <View style={{ width: '50%', paddingVertical: 8 }}>
            <DetailsPanel title="Last Name" content={capitalize(user.users_information.last_name)} />
          </View>

          <View style={{ width: '50%', paddingVertical: 8 }}>
            <DetailsPanel title="Last Name" content={capitalize(user.users_information.department)} />
          </View>

        </View>
      </View>

      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 5,
          backgroundColor: '#F97316',
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#000', fontWeight: '700', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserProfile