import { View } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { useTodoStore } from "@/store/todoStore";
import RenderData from "./RenderData";

const CalenderWithData = () => {
  const [initialDate, setInitialDate] = useState(moment());
  const { getAllTodos } = useTodoStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const data = getAllTodos();
  useEffect(() => {
    // Set the initial date when component mounts
    setInitialDate(moment(selectedDate).subtract(3, "days"));
  }, []);

  return (
    <View className="h-[100%]">
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
      <View className="mb-[180px]">
        <RenderData
          data={data.filter((item) => item.dueDate === selectedDate)}
        />
      </View>
    </View>
  );
};

export default CalenderWithData;
