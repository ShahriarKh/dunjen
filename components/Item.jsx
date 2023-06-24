import css from "./Item.module.scss";
import { SCALE } from "@/app/vars";

export default function Item({ x, y, name }) {
  console.log(name);
  return (
    <span
      className={css.item + " " + css[name]}
      style={{
        top: `${y * 16 * SCALE}px`,
        left: `${x * 16 * SCALE}px`,
      }}
    />
  );
}
