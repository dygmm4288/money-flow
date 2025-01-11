"use client";

import History from "./history/page";
import Expense from "./expense/page";
import Income from "./income/page";

import BarChart from "@/_components/dashboard/charts/bar/BarChart";
import { useEffect, useState } from "react";
import ChartCard from "@/_components/dashboard/charts/doughnut/ChartCard";
import useDashboard from "@/hooks/dashboard/useDashboard";


export default function Page() {
  const {total, expenseTotal, incomeTotal} = useDashboard();

  return (
    <main className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">Dashboard</h1>

      <section className="flex items-center justify-evenly">
        <ChartCard
          totalBalance={total}
          expenseTotal={expenseTotal}
          incomeTotal={incomeTotal}
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
