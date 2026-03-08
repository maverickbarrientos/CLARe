import { Stack } from "expo-router";
import './global.css';
import { useFonts } from "expo-font";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return <Stack>
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
      name="(tabs)"
      options={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: "black"
        }
      }}
    />
  </Stack>;
}
