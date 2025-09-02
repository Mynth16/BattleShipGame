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

  // Start a new game
  const startGame = () => {
    const newGrid = placeShips(createGrid(rows, cols), initialShips);
    setGrid(newGrid);
    setAmmo((rows * cols - 1) / 2);
    setShipsLeft(initialShips);
    setTurns(0);
    setGameState("playing");
  };

  // Handle firing
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

      // update ships left
      const remaining = newGrid.flat().filter((v) => v < 0).length;
      setShipsLeft(remaining);

      // check win condition
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Battleship</h1>

      {gameState === "start" && (
        <div className="flex flex-col items-center bg-blue-700 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-3xl font-bold mb-2">🚢 Setup Game</h2>

          {/* Grid Size Selector */}
          <div className="flex flex-col items-center">
            <label className="mb-1">Grid Size (NxN)</label>
            <select
              value={rows}
              onChange={(e) => {
                const size = parseInt(e.target.value);
                setRows(size);
                setCols(size);
              }}
              className="text-white p-2 rounded"
              style={{ backgroundColor: "blue" }}
            >
              <option value={5}>5 x 5</option>
              <option value={7}>7 x 7</option>
              <option value={9}>9 x 9</option>
            </select>
          </div>

          {/* Ship Count Selector */}
          <div className="flex flex-col items-center">
            <label className="mb-1">Number of Ships</label>
            <input
              type="number"
              value={initialShips}
              min={1}
              max={rows * cols - 1}
              onChange={(e) => setInitialShips(parseInt(e.target.value))}
              className="text-white p-2 rounded w-20 text-center"
              style={{ backgroundColor: "blue" }}
            />
          </div>

          {/* Ammo Preview */}
          <p className="mt-2">
            Ammo will be <b>{(rows * cols - 1) / 2}</b>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-2 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-200"
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
        <div className="flex flex-col items-center bg-green-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">🎉 You Win!</h2>
          <p className="mb-4">All ships destroyed in {turns} turns.</p>
          <button
            onClick={() => setGameState("start")}
            className="px-6 py-2 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-200"
          >
            Play Again
          </button>
        </div>
      )}

      {gameState === "lose" && (
        <div className="flex flex-col items-center bg-red-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">💥 Game Over!</h2>
          <p className="mb-4">You ran out of ammo.</p>
          <button
            onClick={() => setGameState("start")}
            className="px-6 py-2 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
