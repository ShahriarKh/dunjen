"use client";

import { useEffect, useState } from "react";
import css from "./Maze.module.scss";
import Player from "./Player";
import { generateMaze } from "@/utils/generateMaze";

export default function Maze(params) {
  const [maze, setMaze] = useState([[]]);

  useEffect(() => {
    setMaze(generateMaze(27, 40));
  }, []);

  const [playerPosition, setPlayerPosition] = useState([1, 0]);
  const [playerFace, setPlayerFace] = useState("right");

  function handleMove(e) {
    e.preventDefault();

    const [x, y] = playerPosition;

    if ((e.code === "ArrowUp" || e.code === "KeyW") && maze[y - 1][x] === "p") {
      setPlayerPosition([x, y - 1]);
    }
    if ((e.code === "ArrowDown" || e.code === "KeyS") && maze[y + 1][x] === "p") {
      setPlayerPosition([x, y + 1]);
    }
    if ((e.code === "ArrowRight" || e.code === "KeyD") && maze[y][x + 1] === "p") {
      setPlayerPosition([x + 1, y]);
      setPlayerFace("right");
    }
    if ((e.code === "ArrowLeft" || e.code === "KeyA") && maze[y][x - 1] === "p") {
      setPlayerPosition([x - 1, y]);
      setPlayerFace("left");
    }
  }

  return (
    <div
      className={css.maze}
      onKeyDown={handleMove}
      tabIndex={-1}
      style={{ "--cols": maze[0].length, "--rows": maze.length }}
    >
      {maze?.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return <span key={rowIndex + "," + cellIndex} className={cell == "w" ? css.wall : css.path} />;
        })
      )}

      <Player position={playerPosition} face={playerFace} />
    </div>
  );
}
