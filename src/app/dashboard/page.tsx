"use client";

import BarChart from "@/_components/dashboard/charts/bar/BarChart";
import ChartCard from "@/_components/dashboard/charts/doughnut/ChartCard";
import useBarChartData from "@/hooks/dashboard/useBarChartData";
import useDashboard from "@/hooks/dashboard/useDashboard";

export default function Page() {
  const { total, expenseTotal, incomeTotal } = useDashboard();

  const { expenseBarData, incomeBarData } = useBarChartData();

  return (
    <main className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">Dashboard</h1>

      <section className="flex items-center justify-evenly">
        <ChartCard
          totalBalance={total}
          expenseTotal={expenseTotal || 0}
          incomeTotal={incomeTotal || 0}
        />
        {/* 지난 달 수입, 지출 */}
        <div className="flex flex-col gap-2">
          <BarChart
            isCurrent={false}
            type="income"
            data={incomeBarData.lastMonth}
          />
          <BarChart
            isCurrent={false}
            type="expense"
            data={expenseBarData.lastMonth}
          />
        </div>

        {/* 이번 달 수입, 지출 */}
        <div className="flex flex-col gap-2">
          <BarChart isCurrent type="income" data={incomeBarData.currentMonth} />
          <BarChart
            isCurrent
            type="expense"
            data={expenseBarData.currentMonth}
          />
        </div>
      </section>
    </main>
  );
}
