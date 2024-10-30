// components/DistributedRadialChart.tsx
"use client";
import React, { useEffect, useState } from "react";
import { createArcPath } from "@/utils/createArcPath";
import Tooltip from "./Tooltip";

type RadialChartData = {
  name: string;
  value: number;
};

type RadialChartProps = {
  data: RadialChartData[];
};

const RadialChart: React.FC<RadialChartProps> = ({ data }) => {
  const size = 200;
  const center = size / 2;
  const maxRadius = 90;
  const arcThickness = 12;
  const totalValue = 100;
  const gap = 6; // Gap between each arc

  // Track animation progress
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    data.map(() => 0)
  );

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    // Start animation on mount
    setAnimatedValues(data.map((item) => item.value));
  }, [data]);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGPathElement>,
    item: RadialChartData
  ) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: `${item.name}: ${item.value}`,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
    setTooltip((tooltip) => ({
      ...tooltip,
      x: event.clientX,
      y: event.clientY,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((tooltip) => ({
      ...tooltip,
      visible: false,
    }));
  };

  return (
    <>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto"
        preserveAspectRatio="xMinYMin meet"
      >
        {data.map((item, index) => {
          const radius = maxRadius - index * (arcThickness + gap);
          const startAngle = 0;
          const endAngle = (animatedValues[index] / totalValue) * 360;
          const path = createArcPath(
            center,
            center,
            radius,
            startAngle,
            endAngle
          );

          return (
            <g key={index}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#E5E7EB" // Light gray color for background
                strokeWidth={arcThickness}
              />
              <path
                d={path}
                fill="none"
                stroke={index % 2 === 0 ? "#3B82F6" : "#F59E0B"} // alternate colors
                strokeWidth={arcThickness}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * radius} // Full circumference
                strokeDashoffset={2 * Math.PI * radius} // Start fully hidden
                style={{
                  strokeDashoffset: `${
                    2 * Math.PI * radius -
                    (animatedValues[index] / totalValue) * 2 * Math.PI * radius
                  }`,
                  transition: "stroke-dashoffset 1s ease-in-out",
                }}
                onMouseEnter={(event) => handleMouseEnter(event, item)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              {/* Text Label */}
              <text
                x={center}
                y={center - radius + arcThickness / 2}
                textAnchor="middle"
                fill="#374151"
                fontSize="10"
                dy=".35em"
              >
                {/* {item.name} */}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip
        x={tooltip.x}
        y={tooltip.y}
        content={tooltip.content}
        visible={tooltip.visible}
      />
    </>
  );
};

export default RadialChart;
