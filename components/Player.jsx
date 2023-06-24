import css from "./Player.module.scss";
import { SCALE } from "@/utils/shared";

export default function Player({ position, face }) {
  return (
    <span
      className={css.player}
      style={{
        top: `${position[1] * 16 * SCALE - 4 * SCALE}px`,
        left: `${position[0] * 16 * SCALE}px`,
        transform: face === "left" ? "scaleX(-1)" : "scaleX(1)",
      }}
    />
  );
}
