"use client";

import History from "./history/page";
import Expense from "./expense/page";
import Income from "./income/page";

import BarChart from "@/_components/dashboard/charts/bar/BarChart";
import ChartCard from "@/_components/dashboard/charts/doughnut/ChartCard";
import useDashboard from "@/hooks/dashboard/useDashboard";
import { useEffect, useState } from "react";

export default function Page() {
  const { total, expenseTotal, incomeTotal } = useDashboard();

  const [totalData, setTotalData] = useState();

  // TODO 지출, 수입 데이터 barChart에 파싱해서 내려주기
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/pay_total");
      const data = await res.json();

      setTotalData(data);
    };

    fetchData();
  }, []);

  console.log(totalData);

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
          <BarChart isCurrent={false} type="income" />
          <BarChart isCurrent={false} type="expense" />
        </div>
        <div className="flex flex-col gap-2">
          <BarChart isCurrent type="income" />
          <BarChart isCurrent type="expense" />
        </div>
      </section>
    </main>
  );
}
