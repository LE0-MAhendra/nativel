import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Todo } from "@/store/todoStore";

interface Props {
  data: Todo;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSave: (updatedTask: Partial<Todo>) => void;
}

const Custmodal = ({ data, modalVisible, setModalVisible, onSave }: Props) => {
  const [taskName, setTaskName] = useState(data.title);
  const [dueDate, setDueDate] = useState(new Date(data.dueDate));
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setTaskName(data.title);
    setDueDate(new Date(data.dueDate));
  }, [data]);

  const handleSave = () => {
    onSave({
      title: taskName,
      dueDate: moment(dueDate).format("YYYY-MM-DD"),
    });
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-72 p-5 bg-white rounded-lg">
          <Text className="text-lg mb-2">Edit Task</Text>

          {/* Title Input */}
          <TextInput
            placeholder="Task Name"
            className="border-b mb-5 p-2"
            value={taskName}
            onChangeText={setTaskName}
          />

          {/* Date Picker */}
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text className="p-2 border text-center border-gray-400">
              {moment(dueDate).format("D MMM YYYY")}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}

          {/* Buttons */}
          <View className="flex-row justify-between mt-5">
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Custmodal;
