export function generateMaze(width = 15, height = 15) {
  let maze = [];

  function surroundingCells(random_wall) {
    let count = 0;
    if (maze[random_wall[0] - 1][random_wall[1]] == "p") {
      count += 1;
    }
    if (maze[random_wall[0] + 1][random_wall[1]] == "p") {
      count += 1;
    }
    if (maze[random_wall[0]][random_wall[1] - 1] == "p") {
      count += 1;
    }
    if (maze[random_wall[0]][random_wall[1] + 1] == "p") {
      count += 1;
    }

    return count;
  }

  for (let i = 0; i < height; i++) {
    let line = [];
    for (let j = 0; j < width; j++) {
      line.push("u");
    }
    maze.push(line);
  }

  let starting_height = Math.floor(Math.random() * height);
  let starting_width = Math.floor(Math.random() * width);

  if (starting_height === 0) {
    starting_height += 1;
  }
  if (starting_height === height - 1) {
    starting_height -= 1;
  }
  if (starting_width === 0) {
    starting_width += 1;
  }
  if (starting_width === width - 1) {
    starting_width -= 1;
  }

  maze[starting_height][starting_width] = "p";
  let walls = [];
  walls.push([starting_height - 1, starting_width]);
  walls.push([starting_height, starting_width - 1]);
  walls.push([starting_height, starting_width + 1]);
  walls.push([starting_height + 1, starting_width]);

  maze[starting_height - 1][starting_width] = "w";
  maze[starting_height][starting_width - 1] = "w";
  maze[starting_height][starting_width + 1] = "w";
  maze[starting_height + 1][starting_width] = "w";

  while (walls.length) {
    let rand_wall = walls[Math.floor(Math.random() * walls.length)];

    if (rand_wall[1] !== 0) {
      if (maze[rand_wall[0]][rand_wall[1] - 1] === "u" && maze[rand_wall[0]][rand_wall[1] + 1] === "p") {
        let s_cells = surroundingCells(rand_wall);

        if (s_cells < 2) {
          maze[rand_wall[0]][rand_wall[1]] = "p";

          if (rand_wall[0] !== 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] - 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }

          if (rand_wall[0] !== height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] + 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }

          if (rand_wall[1] !== 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] - 1)) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }
        }

        walls = walls.filter((wall) => !(wall[0] === rand_wall[0] && wall[1] === rand_wall[1]));

        continue;
      }
    }

    if (rand_wall[0] !== 0) {
      if (maze[rand_wall[0] - 1][rand_wall[1]] === "u" && maze[rand_wall[0] + 1][rand_wall[1]] === "p") {
        let s_cells = surroundingCells(rand_wall);
        if (s_cells < 2) {
          maze[rand_wall[0]][rand_wall[1]] = "p";

          if (rand_wall[0] !== 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] - 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }

          if (rand_wall[1] !== 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] - 1)) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }

          if (rand_wall[1] !== width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] + 1)) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
        }

        walls = walls.filter((wall) => !(wall[0] === rand_wall[0] && wall[1] === rand_wall[1]));

        continue;
      }
    }

    if (rand_wall[0] !== height - 1) {
      if (maze[rand_wall[0] + 1][rand_wall[1]] === "u" && maze[rand_wall[0] - 1][rand_wall[1]] === "p") {
        let s_cells = surroundingCells(rand_wall);
        if (s_cells < 2) {
          maze[rand_wall[0]][rand_wall[1]] = "p";

          if (rand_wall[0] !== height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] + 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }
          if (rand_wall[1] !== 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] - 1)) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }
          if (rand_wall[1] !== width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] + 1)) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
        }

        walls = walls.filter((wall) => !(wall[0] === rand_wall[0] && wall[1] === rand_wall[1]));

        continue;
      }
    }

    if (rand_wall[1] !== width - 1) {
      if (maze[rand_wall[0]][rand_wall[1] + 1] === "u" && maze[rand_wall[0]][rand_wall[1] - 1] === "p") {
        let s_cells = surroundingCells(rand_wall);
        if (s_cells < 2) {
          maze[rand_wall[0]][rand_wall[1]] = "p";

          if (rand_wall[1] !== width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] !== "p") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] && wall[1] === rand_wall[1] + 1)) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
          if (rand_wall[0] !== height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] + 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }
          if (rand_wall[0] !== 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] !== "p") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "w";
            }
            if (!walls.some((wall) => wall[0] === rand_wall[0] - 1 && wall[1] === rand_wall[1])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }
        }

        walls = walls.filter((wall) => !(wall[0] === rand_wall[0] && wall[1] === rand_wall[1]));

        continue;
      }
    }

    walls = walls.filter((wall) => !(wall[0] === rand_wall[0] && wall[1] === rand_wall[1]));
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (maze[i][j] === "u") {
        maze[i][j] = "w";
      }
    }
  }

  // Set entrance and exit
  for (let i = 0; i < width; i++) {
    if (maze[1][i] === "p") {
      maze[0][i] = "p";
      break;
    }
  }

  for (let i = width - 1; i > 0; i--) {
    if (maze[height - 2][i] === "p") {
      maze[height - 1][i] = "p";
      break;
    }
  }

  return maze;
}
