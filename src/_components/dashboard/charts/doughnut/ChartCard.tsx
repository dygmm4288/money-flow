import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartCard() {
  return (
    <div className="w-full text-center">
      <h1 className="font-bold mb-8">총 자산 현황</h1>
      <Doughnut
        style={{ width: "27rem" }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                // 추가된 부분
                font: {
                  size: 14, // 글자 크기
                },
                padding: 20, // 레전드 항목 간격
              },
            },
          },
        }}
        data={{
          labels: ["총 자산", "소득", "지출"],
          datasets: [
            {
              backgroundColor: ["#1E90FF", "#008B8B", "#FF7F50"],
              data: [100, ((80 / 100) * 100).toFixed(2), (20 / 100) * 100],
            },
          ],
        }}
      />
    </div>
  );
}
