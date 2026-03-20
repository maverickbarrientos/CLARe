import { Stack } from "expo-router";
import './global.css';
import { useFonts } from "expo-font";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (

    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen 
          name="signup"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen 
          name="(tabs)"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "white"
            }
          }}
        />

        <Stack.Screen 
          name="computer_labs"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen 
          name="reservations"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen 
          name="lab_class"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen 
          name="user"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

      </Stack>
    </AuthProvider>

  );
}
