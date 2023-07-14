import { randomNumber } from "./shared";

export function generateItems(mazeWidth, mazeHeight, newMaze) {
  let generatedItems = [];
  let paths = newMaze.flat().filter((cell) => cell == "p").length;

  // sum of random generated items should add up to number of path cells at max.
  let totalCoins = randomNumber(0, paths * 0.1);
  let totalPotions = randomNumber(0, Math.min(paths - totalCoins, 2));
  let totalHearts = randomNumber(0, Math.min(paths - totalCoins - totalPotions, 2));

  const randomItems = {
    potion: totalPotions,
    coin: totalCoins,
    heart: totalHearts,
  };

  Object.entries(randomItems).map((item) => {
    for (let i = 0; i < item[1]; i++) {
      let x = 0;
      let y = 0;
      while (newMaze[y][x] == "w" || generatedItems.some((item) => (item.x == x) & (item.y == y))) {
        x = randomNumber(1, mazeWidth - 1);
        y = randomNumber(1, mazeHeight - 1);
      }
      generatedItems.push({ x: x, y: y, name: item[0] });
    }
  });
  return generatedItems;
}
