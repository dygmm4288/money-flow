import { GroupedByData, PayData } from "@/types/dashboard/type";
import { useEffect, useState } from "react";

export default function useDashboard() {
  const [totalData, setTotalData] = useState<PayData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/pay");
      const data = await res.json();

      setTotalData(data);
    };

    const fetchTotal = async () => {
      const res = await fetch(
        "api/pay_total?start_date=2025-01-01&end_date=2025-02-01",
      );
      const data = await res.json();

      console.log(data);
    };

    fetchTotal();

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
    {},
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

  return { total, expenseTotal, incomeTotal, totalData };
}
