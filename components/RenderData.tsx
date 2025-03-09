import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import moment from "moment";
import { Todo, useTodoStore } from "@/store/todoStore";

const RenderData = ({ data }: any) => {
  const { toggleComplete } = useTodoStore();

  const formatDate = (dateString: string) => {
    const today = moment().startOf("day");
    const taskDate = moment(dateString, "YYYY-MM-DD");
    const diffDays = taskDate.diff(today, "days");
    return diffDays === 0 ? "Today" : taskDate.format("D MMM YYYY");
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-5">No tasks found</Text>
        }
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-white p-4 my-2 rounded-lg shadow">
            <Checkbox
              value={item.isFinished}
              onValueChange={() => toggleComplete(item.id)}
              className="mr-3"
            />
            <View className="flex-1">
              <Text
                className={`text-lg font-bold ${
                  item.isFinished ? "text-gray-400 line-through" : ""
                }`}
              >
                {item.title}
              </Text>
              <Text className="text-gray-500">
                Created: {formatDate(item.createdAt)}
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-500">Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default RenderData;
