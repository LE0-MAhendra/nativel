import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { useTodoStore } from "@/store/todoStore";
import Checkbox from "expo-checkbox";
import RenderData from "./RenderData";

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
  useEffect(() => {
    // Set the initial date when component mounts
    setInitialDate(moment(selectedDate).subtract(3, "days"));
  }, []);

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
        <RenderData
          data={data.filter((item) => item.createdAt === selectedDate)}
        />
      </View>
    </View>
  );
};

export default CalenderWithData;
