import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
const fakedata = [
  {
    id: 1,
    title: "Complete React project",
    description: "Finish implementing the dashboard UI and fix styling issues",
    finished: false,
    date_created: "2025-03-09T10:30:00Z",
  },
  {
    id: 2,
    title: "Write a blog post",
    description: "Draft an article about optimizing Django REST APIs",
    finished: true,
    date_created: "2025-03-08T15:45:00Z",
  },
  {
    id: 3,
    title: "Buy groceries",
    description: "Purchase milk, eggs, and vegetables",
    finished: false,
    date_created: "2025-03-09T08:00:00Z",
  },
  {
    id: 4,
    title: "Prepare for coding interview",
    description:
      "Revise data structures and algorithms, practice system design",
    finished: false,
    date_created: "2025-03-07T18:20:00Z",
  },
  {
    id: 5,
    title: "Schedule a meeting",
    description: "Set up a call with the team to discuss project roadmap",
    finished: true,
    date_created: "2025-03-06T12:10:00Z",
  },
];

export default function Index() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <FlatList
        data={fakedata}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-gray-300">
            <Text className="text-lg font-bold">{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
