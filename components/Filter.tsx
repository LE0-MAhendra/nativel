import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTodoStore } from "@/store/todoStore";
import CalenderWithData from "./CalenderWithData";
import SearchBarCust from "./SearchBar";

const FilterMAin = () => {
  const { getFilterType, setFilterType } = useTodoStore();
  const format = getFilterType().type;
  return (
    <View className="flex-col gap-2">
      <View className="flex-row justify-around ">
        <TouchableOpacity onPress={() => setFilterType({ type: "calender" })}>
          <Text
            className={`px-4 py-2 text-white rounded-lg ${
              format === "calender" ? "font-bold bg-blue-500" : "bg-gray-500"
            }`}
          >
            Calendar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType({ type: "search" })}>
          <Text
            className={`px-4 py-2 text-white rounded-lg ${
              format === "search" ? "font-bold bg-blue-500" : "bg-gray-500"
            }`}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {format === "calender" ? <CalenderWithData /> : <SearchBarCust />}
      </View>
    </View>
  );
};

export default FilterMAin;
