import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
const Header = () => {
  return (
    <View>
      <TouchableOpacity
        className="flex-row text-center gap-4 justify-center items-center pt-2"
        onPress={() => alert("MAde by LEoMAhendra")}
      >
        <Text className="text-[40px] font-extrabold">LEoTodo</Text>
        <FontAwesome5 name="user-ninja" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
