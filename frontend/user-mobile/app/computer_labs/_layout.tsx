import { Stack } from "expo-router";

export default function ComputerLabsLayout() {
  return (

      <Stack>
        <Stack.Screen 
          name="[lab_id]"
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
