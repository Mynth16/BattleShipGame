// Create empty grid
export const createGrid = (rows: number, cols: number): number[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

// Place ships randomly
export const placeShips = (grid: number[][], numShips: number): number[][] => {
  const newGrid = grid.map((row) => [...row]);
  const rows = newGrid.length;
  const cols = newGrid[0].length;
  let placed = 0;

  while (placed < numShips) {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * cols);

    if (
      newGrid[x][y] === 0 &&
      !(x === Math.floor(rows / 2) && y === Math.floor(cols / 2))
    ) {
      newGrid[x][y] = -(placed + 1); // Negative = ship
      placed++;
    }
  }

  return newGrid;
};
