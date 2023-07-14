import Button from "./Button";
import css from "./HUD.module.scss";

export default function HUD({ songIsPlaying, newGame, score, toggleSong, lang, toggleLang }) {
  return (
    <div
      className={css.hud}
      style={{
        direction: lang == "en" ? "ltr" : "rtl",
      }}
    >
      <div>
        {lang === "en" ? "Score" : "امتیاز"}: {score}
      </div>
      <div>
        <Button label={lang === "en" ? "New Game" : "بازی جدید"} onClick={newGame} />
        <Button
          label={
            songIsPlaying ? (lang === "en" ? "Music: ON" : "آهنگ: روشن") : lang === "en" ? "Music: OFF" : "آهنگ: خاموش"
          }
          onClick={toggleSong}
        />
        <Button label={lang === "en" ? "فا" : "EN"} onClick={toggleLang} />
      </div>
    </div>
  );
}
