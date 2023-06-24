import Button from "./Button";
import css from "./HUD.module.scss";

export default function HUD({ openHelp, newGame }) {
  return (
    <div className={css.hud}>
      <Button label={"بازی جدید"} onClick={newGame} />
      <Button label={"راهنما"} onClick={openHelp} />
    </div>
  );
}
