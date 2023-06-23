"use client";

import css from "./game.module.scss";
import Maze from "@/components/Maze";

export default function Home() {
  return (
    <div className={css.app}>
      <Maze />
    </div>
  );
}
