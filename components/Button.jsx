import css from "./Button.module.scss";

export default function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className={css.button}>
      {label}
    </button>
  );
}
