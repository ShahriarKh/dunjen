import css from "./ModalOverlay.module.scss";

export default function ModalOverlay({ children, closeModals }) {
  return (
    <div className={css.overlay} onClick={closeModals}>
      {children}
    </div>
  );
}
