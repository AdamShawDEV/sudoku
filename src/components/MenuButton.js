import useTheme from "../hooks/theme/useTheme";
import styles from "./modules/MenuButton.module.css";

function MenuButton({ children, id, onClick, type = "normal" }) {
  const { currentTheme } = useTheme();
  return (
    <button
      id={id}
      className={
        type === "hero"
          ? styles.heroButton
          : styles["menuButton-" + currentTheme]
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default MenuButton;
