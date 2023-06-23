"use client";

import css from "./Maze.module.scss";
import Player from "./Player";

export default function Maze(params) {
  const MAZE_ROWS = 6;
  const MAZE_COLUMNS = 9;

  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  return (
    <div className={css.maze} style={{ "--cols": MAZE_COLUMNS, "--rows": MAZE_ROWS }}>
      {maze.map((row) =>
        row.map((cell) => {
          return <span className={cell == 1 ? css.wall : css.path} />;
        })
      )}
      <Player position={[1, 1]} />
    </div>
  );
}
