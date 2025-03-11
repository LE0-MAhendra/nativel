import { View, TextInput } from "react-native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Todo, useTodoStore } from "@/store/todoStore";
import RenderData from "./RenderData";

const SearchBarCust = () => {
  const { getAllTodos } = useTodoStore();
  const [data, setData] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const basedata: Todo[] = getAllTodos();
  useEffect(() => {
    setData(basedata);
  }, [basedata]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = getAllTodos().filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };
  // console.log(data);
  return (
    <View className="flex-col gap-2 h-[100%]">
      <View className="flex-row gap-2 items-center bg-white p-2 rounded-xl">
        <Ionicons name="search" size={30} />
        <TextInput
          placeholder="Search"
          className="flex-1 text-[16px] text-black"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View className="mb-[120px]">
        <RenderData data={data} />
      </View>
    </View>
  );
};

export default SearchBarCust;
