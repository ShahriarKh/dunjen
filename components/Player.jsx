import css from "./Player.module.scss";

export default function Player({ position }) {
  console.log(position);
  return <span className={css.player} style={{ top: `${position[0] * 16}px`, left: `${position[1] * 16}px` }} />;
}
