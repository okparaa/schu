import React from "react";
import RadialChart from "./plugins/RadialChart";

const Metrics = () => {
  const chartData = [
    { name: "1st Term", value: 80, apples: 30 },
    { name: "2nd Term", value: 20, bananas: 20 },
    { name: "3rd Term", value: 60, cherries: 50 },
  ];

  return (
    <div className="bg-white">
      <span className="flex p-2 font-bold">Performance</span>
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="max-w-96">
          <RadialChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Metrics;
