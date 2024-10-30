// components/Tooltip.tsx

import React from "react";

type TooltipProps = {
  x: number;
  y: number;
  content: string;
  visible: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({ x, y, content, visible }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: y + 10, // Slight offset from cursor
        left: x + 10,
        padding: "5px 10px",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "4px",
        fontSize: "0.875rem",
        pointerEvents: "none",
        transition: "opacity 0.2s ease-in-out",
        opacity: visible ? 1 : 0,
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
