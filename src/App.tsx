import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import HUD from "./components/HUD";
import { createGrid, placeShips } from "./utils/gameUtils";

const App: React.FC = () => {
  const [rows, setRows] = useState<number>(5);
  const [cols, setCols] = useState<number>(5);
  const [initialShips, setInitialShips] = useState<number>(3);

  const [grid, setGrid] = useState<number[][]>(createGrid(rows, cols));
  const [ammo, setAmmo] = useState<number>((rows * cols - 1) / 2);
  const [shipsLeft, setShipsLeft] = useState<number>(initialShips);
  const [turns, setTurns] = useState<number>(0);
  const [gameState, setGameState] = useState<
    "start" | "playing" | "win" | "lose"
  >("start");

  const startGame = () => {
    const newGrid = placeShips(createGrid(rows, cols), initialShips);
    setGrid(newGrid);
    setAmmo((rows * cols - 1) / 2);
    setShipsLeft(initialShips);
    setTurns(0);
    setGameState("playing");
  };

  const fire = (x: number, y: number) => {
    if (gameState !== "playing") return;

    const centerX = Math.floor(rows / 2);
    const centerY = Math.floor(cols / 2);

    if (x === centerX && y === centerY) {
      alert("Invalid target!");
      return;
    }

    setGrid((prevGrid) => {
      const current = prevGrid[x][y];
      if (current === 999 || current === 998) return prevGrid;

      const newGrid = prevGrid.map((r) => [...r]);
      if (newGrid[x][y] < 0) {
        newGrid[x][y] = 999;
      } else {
        newGrid[x][y] = 998;
      }

      const remaining = newGrid.flat().filter((v) => v < 0).length;
      setShipsLeft(remaining);

      if (remaining === 0) setGameState("win");

      return newGrid;
    });

    setAmmo((a) => {
      const newAmmo = a - 1;
      if (newAmmo <= 0 && shipsLeft > 0) setGameState("lose");
      return newAmmo;
    });

    setTurns((t) => t + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-gradient-to-b from-blue-900 to-black">
      <h1 className="mb-6 text-4xl font-bold">Battleship</h1>

      {gameState === "start" && (
        <div className="flex flex-col items-center p-6 space-y-4 bg-blue-700 shadow-lg rounded-xl">
          <h2 className="mb-2 text-3xl font-bold">🚢 Setup Game</h2>

          <div className="flex flex-col items-center">
            <label className="mb-1">Grid Size (NxN)</label>
            <select
              value={rows}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setRows(size);
                setCols(size);
              }}
              className="p-2 text-white rounded"
              style={{ backgroundColor: "blue" }}
            >
              <option value={5}>5 x 5</option>
              <option value={7}>7 x 7</option>
              <option value={9}>9 x 9</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label className="mb-1">Number of Ships</label>
            <input
              type="number"
              value={initialShips}
              min={1}
              max={rows * cols - 1}
              onChange={(e) => setInitialShips(parseInt(e.target.value))}
              className="w-20 p-2 text-center text-white rounded"
              style={{ backgroundColor: "blue" }}
            />
          </div>

          <p className="mt-2">
            Ammo will be <b>{(rows * cols - 1) / 2}</b>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-2 font-bold text-blue-700 bg-white rounded-lg hover:bg-gray-200"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <>
          <HUD ammo={ammo} shipsLeft={shipsLeft} turns={turns} />
          <GameBoard grid={grid} fire={fire} rows={rows} cols={cols} />
        </>
      )}

      {gameState === "win" && (
        <div className="flex flex-col items-center p-6 bg-green-700 shadow-lg rounded-xl">
          <h2 className="mb-4 text-3xl font-bold">🎉 You Win!</h2>
          <p className="mb-4">All ships destroyed in {turns} turns.</p>
          <button
            onClick={() => setGameState("start")}
            className="px-6 py-2 font-bold text-green-700 bg-white rounded-lg hover:bg-gray-200"
          >
            Play Again
          </button>
        </div>
      )}

      {gameState === "lose" && (
        <div className="flex flex-col items-center p-6 bg-red-700 shadow-lg rounded-xl">
          <h2 className="mb-4 text-3xl font-bold">💥 Game Over!</h2>
          <p className="mb-4">You ran out of ammo.</p>
          <button
            onClick={() => setGameState("start")}
            className="px-6 py-2 font-bold text-red-700 bg-white rounded-lg hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
