import React from "react";
import Cell from "./Cell";

interface RowProps {
  row: number[];
  rowIndex: number;
  fire: (x: number, y: number) => void;
}

const Row: React.FC<RowProps> = ({ row, rowIndex, fire }) => {
  return (
    <div className="row">
      {row.map((cell, j) => (
        <Cell key={j} value={cell} x={rowIndex} y={j} fire={fire} />
      ))}
    </div>
  );
};

export default Row;
