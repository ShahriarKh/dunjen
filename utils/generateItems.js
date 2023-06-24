import { randomNumber } from "./shared";

export function generateItems(MAZE_WIDTH, MAZE_HEIGHT, newMaze) {
  let generatedItems = [];
  const randomItems = {
    potion: randomNumber(0, 2),
    coin: randomNumber(1, 6),
    heart: randomNumber(0, 2),
  };
  Object.entries(randomItems).map((item) => {
    for (let i = 0; i < item[1]; i++) {
      let x = 0;
      let y = 0;
      while (newMaze[y][x] == "w" || generatedItems.some((item) => (item.x == x) & (item.y == y))) {
        x = randomNumber(1, MAZE_WIDTH - 1);
        y = randomNumber(1, MAZE_HEIGHT - 1);
      }
      generatedItems.push({ x: x, y: y, name: item[0] });
    }
  });
  return generatedItems;
}
