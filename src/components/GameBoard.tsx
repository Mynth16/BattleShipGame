import React from "react";
import Cell from "./Cell";

interface GameBoardProps {
  grid: number[][];
  fire: (x: number, y: number) => void;
  rows: number;
  cols: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ grid, fire, rows, cols }) => {
  return (
    <div
      className="gap-1 p-2 bg-blue-900 border-4 border-blue-400 rounded-lg"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, x) =>
        row.map((cell, y) => (
          <Cell
            key={`${x}-${y}`}
            value={cell}
            x={x}
            y={y}
            fire={fire}
            rows={rows}
            cols={cols}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
