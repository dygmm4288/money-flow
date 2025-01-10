import React from "react";

import ChartCard from "./doughnut/ChartCard";

export default function Charts() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <main className="flex items-center justify-between">
        <ChartCard />
      </main>
    </div>
  );
}
