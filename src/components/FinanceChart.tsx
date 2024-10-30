// pages/index.tsx

import React from "react";
import MultiLineChart from "@/components/plugins/MultiLineChart";

const data = [
  { name: "Dataset 1", values: [4000, 3000, 2000, 2780, 1890, 2390, 3490] },
  { name: "Dataset 2", values: [2400, 1398, 9800, 3908, 4800, 3800, 4300] },
];

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul"];

const colors = ["red", "green"]; // Optional colors for lines

const FinanceChart: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <MultiLineChart data={data} labels={labels} colors={colors} />
    </div>
  );
};

export default FinanceChart;
