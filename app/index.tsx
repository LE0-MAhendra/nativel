import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import Header from "@/components/Header";
import FilterMAin from "@/components/Filter";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 px-[20px] gap-4 bg-slate-400">
      <Header />
      <FilterMAin />
    </SafeAreaView>
  );
}
