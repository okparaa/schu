// components/MultiLineChart.tsx

"use client";

import React, { useEffect, useState } from "react";

type LineChartData = {
  name: string;
  values: number[];
};

type MultiLineChartProps = {
  data: LineChartData[];
  labels: string[]; // Labels for the X-axis
  colors?: string[]; // Optional colors for each line
};

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  data,
  labels,
  colors,
}) => {
  const chartWidth = 600;
  const chartHeight = 300;
  const maxValue = Math.max(...data.flatMap((item) => item.values));
  const tension = 0.15; // Adjust tension closer to 0 for straighter lines
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

  const [, setAnimatedData] = useState<number[][]>(
    data.map((item) => item.values.map(() => 0))
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimatedData(data.map((item) => item.values));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [data]);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGCircleElement>,
    value: number
  ) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: `${value}`,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGCircleElement>) => {
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

  // Generate a subtle Catmull-Rom spline
  const generateSubtleCatmullRomPath = (points: { x: number; y: number }[]) => {
    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const x1 = p1.x + (p2.x - p0.x) * tension;
      const y1 = p1.y + (p2.y - p0.y) * tension;

      const x2 = p2.x - (p3.x - p1.x) * tension;
      const y2 = p2.y - (p3.y - p1.y) * tension;

      path += ` C${x1},${y1} ${x2},${y2} ${p2.x},${p2.y}`;
    }
    return path;
  };

  return (
    <div className="relative w-full h-auto">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className="w-full h-auto bg-white"
      >
        {/* Y-axis */}
        <line
          x1="40"
          y1="10"
          x2="40"
          y2={chartHeight - 30}
          stroke="#d1d5db"
          strokeWidth="1"
        />

        {/* X-axis */}
        <line
          x1="40"
          y1={chartHeight - 30}
          x2={chartWidth - 10}
          y2={chartHeight - 30}
          stroke="#d1d5db"
          strokeWidth="1"
        />

        {/* Y-axis grid lines and labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const y = chartHeight - 30 - ((chartHeight - 50) / 5) * i;
          const value = Math.round((maxValue / 5) * i);

          return (
            <g key={i}>
              <line
                x1="40"
                y1={y}
                x2={chartWidth - 10}
                y2={y}
                stroke="#d1d5db"
                strokeWidth="0.5"
              />
              <text
                x="30"
                y={y + 5}
                textAnchor="end"
                fontSize="10"
                fill="#374151"
              >
                {value}
              </text>
            </g>
          );
        })}

        {data.map((lineData, lineIndex) => {
          const points = lineData.values.map((value, index) => {
            const x = 40 + (index * (chartWidth - 50)) / (labels.length - 1);
            const y =
              chartHeight - 30 - (value / maxValue) * (chartHeight - 50);
            return { x, y };
          });

          const pathData = generateSubtleCatmullRomPath(points);

          return (
            <g key={lineIndex}>
              {/* Animated Line Path */}
              <path
                d={pathData}
                fill="none"
                stroke={
                  colors
                    ? colors[lineIndex]
                    : `hsl(${(lineIndex / data.length) * 360}, 70%, 60%)`
                }
                strokeWidth="1"
                className="line-animation"
                style={{
                  strokeDasharray: "2000",
                  strokeDashoffset: "2000",
                  animation: "drawLine 2s forwards",
                }}
              />

              {/* Data Points */}
              {lineData.values.map((value, index) => {
                const x =
                  40 + (index * (chartWidth - 50)) / (labels.length - 1);
                const y =
                  chartHeight - 30 - (value / maxValue) * (chartHeight - 50);
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r={3}
                      stroke="black"
                      fill="white"
                      onMouseEnter={(event) => handleMouseEnter(event, value)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="transition-all duration-700 ease-out"
                    />
                    {tooltip.visible && tooltip.content === `${value}` && (
                      <text
                        x={x + 10}
                        y={y - 10}
                        fill="black"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {value}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute px-2 py-1 text-white bg-gray-700 rounded text-xs"
          style={{ left: tooltip.x + 10, top: tooltip.y - 20 }}
        >
          {tooltip.content}
        </div>
      )}

      {/* X-axis Labels */}
      <div className="flex justify-between bg-white -mt-5 pl-6">
        {labels.map((label, index) => (
          <span key={index} className="text-sm text-gray-700">
            {label}
          </span>
        ))}
      </div>

      {/* Animation Styling */}
      <style jsx>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MultiLineChart;
