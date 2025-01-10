import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

Chart.register(BarElement, Tooltip, CategoryScale, LinearScale);

type Props = {
  isCurrent: boolean;
  type: "expense" | "income";
};

export default function BarChart({ isCurrent = true, type }: Props) {
  const titleRenderer = () => {
    switch (type) {
      case "expense":
        return isCurrent ? "이번 달 지출" : "저번 달 지출";
      case "income":
        return isCurrent ? "이번 달 수입" : "저번 달 수입";
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold">{titleRenderer()}</h1>
      <Bar
        style={{
          width: "30rem",
        }}
        options={{
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: ["저축", "쇼핑", "주거비", "식비"],
          datasets: [
            {
              label: "이번 달 지출 내역",
              backgroundColor: ["#1E90FF", "#008B8B", "#FF7F50", "#d2b4de "],
              data: [500000, 150000, 300000, 50000],
            },
          ],
        }}
      />
    </div>
  );
}
