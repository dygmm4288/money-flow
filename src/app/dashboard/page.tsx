"use client";

import History from "./history/page";
import Expense from "./expense/page";
import Income from "./income/page";

import BarChart from "@/_components/dashboard/charts/bar/BarChart";
import ChartCard from "@/_components/dashboard/charts/doughnut/ChartCard";
import useDashboard from "@/hooks/dashboard/useDashboard";
import { useEffect, useState } from "react";
import { GroupedByData } from "@/types/dashboard/type";

export default function Page() {
  const {
    total,
    expenseTotal,
    incomeTotal,
    totalData: totalGroupedData,
  } = useDashboard();

  const [totalData, setTotalData] = useState<GroupedByData>();

  // TODO 지출, 수입 데이터 barChart에 내려주기
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/pay_total");
      const data = await res.json();

      setTotalData(data);
    };

    fetchData();
  }, []);

  // bar차트 데이터
  // TODO: 결제일을 filter해서 이전 달과 이번 달 데이터로 나누기
  const expenseBarData =
    totalGroupedData?.filter((item) => item.type === "expense") || [];
  const incomeBarData =
    totalGroupedData?.filter((item) => item.type === "income") || [];

  return (
    <main className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">Dashboard</h1>

      <section className="flex items-center justify-evenly">
        <ChartCard
          totalBalance={total}
          expenseTotal={expenseTotal || 0}
          incomeTotal={incomeTotal || 0}
        />
        <div className="flex flex-col gap-2">
          <BarChart isCurrent={false} type="income" data={incomeBarData} />
          <BarChart isCurrent={false} type="expense" data={expenseBarData} />
        </div>
        <div className="flex flex-col gap-2">
          <BarChart isCurrent type="income" data={incomeBarData} />
          <BarChart isCurrent type="expense" data={expenseBarData} />
        </div>
      </section>
    </main>
  );
}
