import { Stack } from "expo-router";

export default function ReservationLayout() {
  return (

      <Stack>
        <Stack.Screen
          name="edit_reservation"
          options={{ 
            headerShown: false,
            contentStyle: {
              backgroundColor: "black"
            }
          }}
        />

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
          name="cancellation_form"
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
