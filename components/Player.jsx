import css from "./Player.module.scss";

export default function Player({ position }) {
  return (
    <span className={css.player} style={{ top: `${position[1] * 16 * 6 - 16}px`, left: `${position[0] * 16 * 6}px` }} />
  );
}
