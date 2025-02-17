import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  totalBalance: number;
  expenseTotal: number;
  incomeTotal: number;
};

export default function ChartCard({
  totalBalance,
  expenseTotal,
  incomeTotal,
}: Props) {
  return (
    <div className="w-[500px] h-[500px] text-center">
      <h1 className="font-bold mb-8">총 자산 현황</h1>
      <Doughnut
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 14,
                },
                padding: 20,
              },
            },
          },
        }}
        data={{
          labels: ["총 자산", "소득", "지출"],
          datasets: [
            {
              backgroundColor: ["#1E90FF", "#008B8B", "#FF7F50"],
              data: [totalBalance, incomeTotal, expenseTotal],
            },
          ],
        }}
      />
    </div>
  );
}
