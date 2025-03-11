import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import moment from "moment";
import { Todo, useTodoStore } from "@/store/todoStore";
import Custmodal from "./Custmodal";

const RenderData = ({ data }: { data: Todo[] }) => {
  const { toggleComplete, editOneTodo } = useTodoStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<Todo | null>(null);

  const formatDate = (dateString: string) => {
    const today = moment().startOf("day");
    const taskDate = moment(dateString, "YYYY-MM-DD");
    return taskDate.diff(today, "days") === 0
      ? "Today"
      : taskDate.format("D MMM YYYY");
  };

  return (
    <View>
      <ScrollView>
        {data.length === 0 ? (
          <Text className="text-center text-gray-500 mt-5">No tasks found</Text>
        ) : (
          data.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center bg-white p-4 my-2 rounded-lg shadow"
            >
              {/* Checkbox */}
              <Checkbox
                value={item.isFinished}
                // onValueChange={() => alert("clicked")}
                onValueChange={() => toggleComplete(item.id)}
                className="mr-3"
              />

              {/* Task Info */}
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

              {/* Edit Button */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setEditTask(item);
                }}
              >
                <Text className="text-blue-500">Edit</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Edit Modal */}
      {editTask && (
        <Custmodal
          data={editTask}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          onSave={(updatedTask) => {
            editOneTodo(editTask.id, updatedTask);
            setModalVisible(false);
          }}
        />
      )}
    </View>
  );
};

export default RenderData;
