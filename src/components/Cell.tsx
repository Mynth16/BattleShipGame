// src/components/Cell.tsx
import React from "react";

interface CellProps {
  value: number;
  x: number;
  y: number;
  fire: (x: number, y: number) => void;
  rows: number;
  cols: number;
}

const Cell: React.FC<CellProps> = ({ value, x, y, fire, rows, cols }) => {
  const centerX = Math.floor(rows / 2);
  const centerY = Math.floor(cols / 2);
  const isCenter = x === centerX && y === centerY;
  const alreadyFired = value === 999 || value === 998;

  const handleClick = () => {
    if (isCenter) {
      alert("Invalid target!");
      return;
    }
    if (alreadyFired) return;
    fire(x, y);
  };

  let content = "";
  let styleClass =
    "w-12 h-12 flex items-center justify-center text-xl font-bold rounded transition-colors";

  if (value === 999) {
    styleClass += " bg-red-500";
    content = "💥";
  } else if (value === 998) {
    styleClass += " bg-gray-500";
    content = "•";
  } else {
    styleClass += " bg-blue-700 hover:bg-blue-600";
    if (isCenter) content = "🚢";
  }

  return (
    <button
      onClick={handleClick}
      disabled={alreadyFired || isCenter}
      className={`${styleClass} ${
        alreadyFired || isCenter
          ? "cursor-not-allowed opacity-80"
          : "cursor-pointer"
      }`}
      aria-label={`cell-${x}-${y}`}
      type="button"
    >
      {content}
    </button>
  );
};

export default Cell;
