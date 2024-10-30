import React from "react";
import MultiBarChart from "@/components/plugins/MultiBarChart";

const AttendanceChart = () => {
  const data = [
    { name: "Category 1", values: [70, 80, 45] },
    { name: "Category 2", values: [60, 90, 55] },
    { name: "Category 3", values: [90, 60, 80] },
  ];
  const labels = ["2021", "2022", "2023"];
  const colors = ["#3B82F6", "#F59E0B", "#10B981"]; // Optional colors for each bar

  return (
    <div className="flex flex-col justify-center h-full bg-white">
      <div className="font-bold flex justify-between">
        <span className="pl-10">Attendance</span>
        <span className="icon-dot-3"></span>
      </div>
      <MultiBarChart data={data} labels={labels} colors={colors} />
    </div>
  );
};
export default AttendanceChart;
