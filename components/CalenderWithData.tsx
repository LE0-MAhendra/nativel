import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { useTodoStore } from "@/store/todoStore";
import Checkbox from "expo-checkbox";

const CalenderWithData = () => {
  const [initialDate, setInitialDate] = useState(moment());
  const { getAllTodos, toggleComplete } = useTodoStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const data = getAllTodos();
  const formatDate = (dateString: string) => {
    const today = moment().startOf("day");
    const taskDate = moment(dateString, "YYYY-MM-DD");
    const diffDays = taskDate.diff(today, "days");

    if (diffDays === 0) return "Today";
    return taskDate.format("D MMM YYYY"); // Example: "4 Jan 2025"
  };
  return (
    <View>
      <View>
        <CalendarStrip
          scrollable
          style={{ height: 100, paddingVertical: 10 }}
          calendarColor="transparent"
          calendarHeaderStyle={{ color: "black", fontSize: 16 }}
          dateNumberStyle={{ color: "black", fontSize: 14 }}
          dateNameStyle={{ color: "black", fontSize: 12 }}
          highlightDateNumberStyle={{ color: "cyan", fontSize: 16 }}
          highlightDateNameStyle={{ color: "blue", fontSize: 14 }}
          selectedDate={moment(selectedDate)}
          startingDate={initialDate}
          onDateSelected={(date) => setSelectedDate(date.format("YYYY-MM-DD"))}
        />
      </View>
      <View>
        <FlatList
          data={data.filter((item) => item.createdAt === selectedDate)}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-5">
              No tasks for this date
            </Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white p-4 my-2 rounded-lg shadow">
              {/* ✅ Toggle completion state */}
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

export default CalenderWithData;
