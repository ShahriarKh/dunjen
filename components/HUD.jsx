import Button from "./Button";
import css from "./HUD.module.scss";

export default function HUD(params) {
  return (
    <div className={css.hud}>
      <Button label={"بازی جدید"} />
      <Button label={"راهنما"} />
    </div>
  );
}
