import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import CalenderWithData from "@/components/CalenderWithData";
export default function Index() {
  return (
    <SafeAreaView className="flex-1 px-[20px] gap-4">
      <Header />
      <CalenderWithData />
    </SafeAreaView>
  );
}
