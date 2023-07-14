import Button from "./Button";
import css from "./ResultModal.module.scss";

export default function ResultModal({ button, score, lang }) {
  return (
    <div
      className={css.modal}
      style={{
        direction: lang == "en" ? "ltr" : "rtl",
      }}
    >
      {score} {lang === "en" ? "points!" : "امتیاز!"}
      <Button label={lang === "en" ? "New Game" : "بازی جدید"} onClick={button} />
    </div>
  );
}
