"use client";

import HUD from "@/components/HUD";
import css from "./page.module.scss";
import Maze from "@/components/Maze";

export default function Page() {
  return (
    <div className={css.app}>
      <HUD />
      <Maze />
    </div>
  );
}
