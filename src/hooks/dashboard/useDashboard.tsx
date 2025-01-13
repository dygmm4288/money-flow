import React, { useEffect, useState } from "react";

type PayData = {
  [key: string]: number | string | string[];
  amount: number;
  category: string;
  created_at: string;
  date: string;
  id: number;
  location: string;
  riskLevel: string | number;
  tags: string[];
  type: string;
};

type GroupedByData = {
  expense: PayData[];
  income: PayData[];
};

export default function useDashboard() {
  const [totalData, setTotalData] = useState<PayData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/pay");
      const data = await res.json();

      setTotalData(data);
    };

    fetchData();
  }, []);

  const total = 500000;

  const groupedByType = totalData.reduce<Record<string, PayData[]>>(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }

      acc[item.type].push(item);
      return acc;
    },
    {}
  );

  const expenseTotal = (groupedByType as GroupedByData).expense
    ?.filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      return (acc += item.amount);
    }, 0);

  const incomeTotal = (groupedByType as GroupedByData).income
    ?.filter((item) => item.type === "income")
    .reduce((acc, item) => {
      return (acc += item.amount);
    }, 0);

  return { total, expenseTotal, incomeTotal };
}
