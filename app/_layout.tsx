import { Stack } from "expo-router";
import "./global.css";
import { useTodoStore } from "@/store/todoStore";
import { useEffect } from "react";

export default function RootLayout() {
  const loadTodos = useTodoStore((state) => state.loadTodos);

  useEffect(() => {
    loadTodos(); // Load todos on app startup
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
