import Button from "./Button";
import css from "./HUD.module.scss";

export default function HUD({ openHelp, newGame, score, toggleSong }) {
  return (
    <div className={css.hud}>
      <Button label={"بازی جدید"} onClick={newGame} />
      {/* <Button label={"راهنما"} onClick={openHelp} /> */}
      <Button label={"آهنگ"} onClick={toggleSong} />
      <span></span>
      <div>امتیاز: {score}</div>
    </div>
  );
}
