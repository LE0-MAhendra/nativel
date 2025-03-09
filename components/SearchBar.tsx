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
import RenderData from "./RenderData";

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
  // console.log(data);
  return (
    <View className="flex-col gap-2">
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
        <RenderData data={data} />
      </View>
    </View>
  );
};

export default SearchBarCust;
