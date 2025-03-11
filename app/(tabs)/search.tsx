import React from "react";
import SearchBarCust from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const search = () => {
  return (
    <SafeAreaView className="h-[100%]">
      <Header />
      <SearchBarCust />
    </SafeAreaView>
  );
};

export default search;
