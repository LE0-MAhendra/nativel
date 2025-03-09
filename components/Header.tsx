import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
const Header = () => {
  return (
    <View className=" flex-row justify-between items-center pt-2">
      <TouchableOpacity onPress={() => alert("clicked")}>
        <Ionicons name="menu" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("clicked Ninja")}>
        <FontAwesome5 name="user-ninja" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
