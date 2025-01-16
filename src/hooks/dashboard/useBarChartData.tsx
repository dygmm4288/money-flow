import React from "react";
import useDashboard from "./useDashboard";
import { PayData } from "@/types/dashboard/type";

export default function useBarChartData() {
  const { totalData: totalGroupedData } = useDashboard();

  // bar차트 데이터
  const isLastMonth = (date: string) => {
    const currentMonth = new Date().getMonth() + 1;
    const dataMonth = date.split("-")[1];

    if (currentMonth === 1 && Number(dataMonth) === 12) {
      return Number(dataMonth) === 12 ? true : false;
    }

    if (currentMonth - 1 === Number(dataMonth)) {
      return true;
    } else {
      return false;
    }
  };

  const expenseBarData =
    totalGroupedData
      ?.filter((item) => item.type === "expense")
      .reduce((acc, cur) => {
        const key = isLastMonth(cur.date) ? "lastMonth" : "currentMonth";

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(cur);

        return acc;
      }, {} as Record<"lastMonth" | "currentMonth", PayData[]>) || [];

  const incomeBarData =
    totalGroupedData
      ?.filter((item) => item.type === "income")
      .reduce((acc, cur) => {
        const key = isLastMonth(cur.date) ? "lastMonth" : "currentMonth";

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(cur);

        return acc;
      }, {} as Record<"lastMonth" | "currentMonth", PayData[]>) || [];
  return { expenseBarData, incomeBarData };
}
