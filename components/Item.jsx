import css from "./Item.module.scss";
import { SCALE } from "@/app/vars";

export default function Item({ x, y, name }) {
  return (
    <span
      className={css.item}
      style={{
        top: `${y * 16 * SCALE - 4 * SCALE}px`,
        left: `${x * 16 * SCALE}px`,
      }}
    >
      {name}
    </span>
  );
}
