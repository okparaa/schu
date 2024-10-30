import React from "react";

import RadialChart from "@/components/plugins/RadialChart";
const data = [
  { name: "Boys", value: 55, boys: 80 },
  { name: "Girls", value: 45, girls: 65 },
];
const info = data.reduce(
  (gender, value) => {
    if (value.name.toLowerCase() === "boys") {
      gender.boys = value.boys as number;
      return gender;
    }
    gender.girls = value.girls as number;
    return gender;
  },
  { boys: 0, girls: 0 }
);
const CountChart = () => {
  return (
    <div className="bg-white w-full h-full rounded-xl px-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student</h1>
        <span className="icon-dot-3"></span>
      </div>

      <RadialChart data={data} />

      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-8 h-8 rounded-full outline outline-gray-300 icon-male text-2xl" />
          <h1 className="font-bold">{info.boys}</h1>
          <h2 className="text-xs text-gray-500 text-center">
            Boys {Math.round((info.boys * 100) / (info.boys + info.girls))}%
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-8 h-8 rounded-full icon-female text-2xl outline outline-gray-300" />
          <h1 className="font-bold">{info.girls}</h1>
          <h2 className="text-xs text-gray-500 text-center">
            Girls {Math.round((info.girls * 100) / (info.boys + info.girls))}%
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
