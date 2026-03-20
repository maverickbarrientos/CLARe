import { Stack } from "expo-router";

export default function ReservationsLayout() {
  return (

      <Stack>
        <Stack.Screen 
          name="reservation_form"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

        <Stack.Screen
          name="[id]"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />
      </Stack>

  );
}
