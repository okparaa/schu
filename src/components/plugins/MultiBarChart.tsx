"use client";

import React, { useEffect, useState } from "react";

type BarData = {
  name: string;
  values: number[];
};

type MultipleBarChartProps = {
  data: BarData[];
  labels: string[]; // Labels for each bar group (e.g., '2021', '2022', etc.)
  colors?: string[]; // Optional array of colors for each bar
};

const MultipleBarChart: React.FC<MultipleBarChartProps> = ({
  data,
  labels,
  colors,
}) => {
  const chartWidth = 400;
  const chartHeight = 300;
  const maxValue = Math.max(...data.flatMap((item) => item.values));
  const barWidth = 20;
  const barGap = 5;
  const groupGap = 40;

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

  const [animatedHeights, setAnimatedHeights] = useState<number[][]>(
    data.map((item) => item.values.map(() => 0))
  );

  useEffect(() => {
    // Trigger animation by setting bar heights after a delay
    const timeoutId = setTimeout(() => {
      setAnimatedHeights(
        data.map((item) =>
          item.values.map((value) => (value / maxValue) * (chartHeight - 50))
        )
      );
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [data, maxValue]);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGRectElement>,
    value: number,
    label: string
  ) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      content: `${label}: ${value}`,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
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
          strokeWidth="0.5"
          fill="pink"
        />

        {/* X-axis */}
        <line
          x1="40"
          y1={chartHeight - 30}
          x2={chartWidth - 10}
          y2={chartHeight - 30}
          stroke="d1d5db"
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
                stroke="#E5E7EB"
                strokeWidth="1"
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

        {data.map((item, groupIndex) => (
          <g
            key={groupIndex}
            transform={`translate(${
              60 + groupIndex * (labels.length * (barWidth + barGap) + groupGap)
            }, 0)`}
          >
            {/* Category label */}
            <text
              x={(labels.length * (barWidth + barGap)) / 2}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#374151"
            >
              {item.name}
            </text>

            {item.values.map((value, barIndex) => {
              const barColor =
                colors && colors[barIndex]
                  ? colors[barIndex]
                  : `hsl(${(barIndex / labels.length) * 360}, 70%, 60%)`;
              const barHeight = animatedHeights[groupIndex][barIndex];

              return (
                <rect
                  key={barIndex}
                  x={barIndex * (barWidth + barGap)}
                  y={chartHeight - 30 - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill={barColor}
                  className="transition-all duration-700 ease-out"
                  onMouseEnter={(event) =>
                    handleMouseEnter(event, value, labels[barIndex])
                  }
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </g>
        ))}
      </svg>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute px-2 py-1 text-white bg-gray-700 rounded text-xs"
          style={{ left: tooltip.x - 440, top: tooltip.y - 240 }}
        >
          {tooltip.content}
        </div>
      )}
      {/* Legend */}
      <div className="flex justify-center py-1 space-x-4">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="inline-block w-4 h-4"
              style={{
                backgroundColor:
                  colors && colors[index]
                    ? colors[index]
                    : `hsl(${(index / labels.length) * 360}, 70%, 60%)`,
              }}
            />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleBarChart;
