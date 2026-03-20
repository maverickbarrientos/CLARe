import { Stack } from "expo-router";

export default function LabClassLayout() {
  return (

      <Stack>
        <Stack.Screen 
          name="[class_id]"
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
