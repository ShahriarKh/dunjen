import Button from "./Button";
import css from "./ResultModal.module.scss";

export default function ResultModal({ button, score }) {
  return (
    <div className={css.modal}>
      {score} امتیاز!
      <Button label="بازی جدید" onClick={button} />
    </div>
  );
}
