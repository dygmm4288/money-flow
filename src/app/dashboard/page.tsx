"use client";

import History from "./history/page";
import Expense from "./expense/page";
import Income from "./income/page";
import Charts from "../../_components/dashboard/charts/doughnut/Charts";
import BarChart from "@/_components/dashboard/charts/bar/BarChart";

export default function Page() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">Dashboard</h1>

      <section className="flex items-center justify-evenly">
        <Charts />
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
