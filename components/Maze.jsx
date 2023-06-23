"use client";

import { useState } from "react";
import css from "./Maze.module.scss";
import Player from "./Player";

export default function Maze(params) {
  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState([1, 1]);

  function handleMove(e) {
    e.preventDefault();

    const [x, y] = playerPosition;

    if ((e.code === "ArrowUp" || e.code === "KeyW") && maze[y - 1][x] === 0) {
      setPlayerPosition([x, y - 1]);
    }
    if ((e.code === "ArrowDown" || e.code === "KeyS") && maze[y + 1][x] === 0) {
      setPlayerPosition([x, y + 1]);
    }
    if ((e.code === "ArrowRight" || e.code === "KeyD") && maze[y][x + 1] === 0) {
      setPlayerPosition([x + 1, y]);
    }
    if ((e.code === "ArrowLeft" || e.code === "KeyA") && maze[y][x - 1] === 0) {
      setPlayerPosition([x - 1, y]);
    }
  }

  return (
    <div
      className={css.maze}
      onKeyDown={handleMove}
      tabIndex={-1}
      style={{ "--cols": maze[0].length, "--rows": maze.length }}
    >
      {maze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return <span key={rowIndex + "," + cellIndex} className={cell == 1 ? css.wall : css.path} />;
        })
      )}

      <Player position={playerPosition} />
    </div>
  );
}
