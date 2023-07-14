import css from "./Maze.module.scss";

export default function Maze({ maze, children }) {
  return (
    <div className={css.maze} style={{ "--cols": maze[0].length, "--rows": maze.length }}>
      {maze?.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          return <span key={rowIndex + "," + cellIndex} className={cell == "w" ? css.wall : css.path} />;
        })
      )}
      {children}
    </div>
  );
}
