import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Todo, useTodoStore } from "@/store/todoStore";
import Checkbox from "expo-checkbox";

const SearchBarCust = () => {
  const { getAllTodos, toggleComplete } = useTodoStore();
  const [data, setData] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const basedata: Todo[] = getAllTodos();
    setData(basedata);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = getAllTodos().filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const formatDate = (dateString: string) => {
    const today = moment().startOf("day");
    const taskDate = moment(dateString, "YYYY-MM-DD");
    const diffDays = taskDate.diff(today, "days");
    return diffDays === 0 ? "Today" : taskDate.format("D MMM YYYY");
  };

  return (
    <View>
      <View className="flex-row gap-2 items-center bg-white p-2 rounded-xl">
        <Ionicons name="search" size={30} />
        <TextInput
          placeholder="Search"
          className="flex-1 text-[16px] text-black"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-5">
              No tasks found
            </Text>
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
        />
      </View>
    </View>
  );
};

export default SearchBarCust;
