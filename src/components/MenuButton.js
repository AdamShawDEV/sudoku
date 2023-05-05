import styles from "./modules/MenuButton.module.css";

function MenuButton({ children, id, onClick, type = "normal" }) {
  return (
    <button
      id={id}
      className={type === "hero" ? styles.heroButton : styles.menuButton}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MenuButton;
