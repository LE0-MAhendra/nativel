import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "@/components/Header";
import { useTodoStore } from "@/store/todoStore";

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { addTodo } = useTodoStore(); // Get addTodo from store

  const handleAddTodo = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    addTodo(title, dueDate.toISOString().split("T")[0]); // Format to YYYY-MM-DD
    Alert.alert(
      "Success",
      `Todo added successfully ${title}, ${dueDate.toISOString().split("T")[0]}`
    );
    setTitle("");
    setDueDate(new Date());
  };

  return (
    <SafeAreaView>
      <Header />
      <View className="flex p-4">
        <Text className="text-xl font-bold mb-4">Create New Todo</Text>

        {/* Title Input */}
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          className="border border-gray-300 rounded-lg p-3 mb-4"
        />

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="border border-gray-300 rounded-lg p-3 mb-4"
        >
          <Text>{dueDate.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDueDate(selectedDate);
            }}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleAddTodo}
          className="bg-blue-500 rounded-lg p-3"
        >
          <Text className="text-white text-center font-bold">Add Todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Create;
