import styles from "./modules/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <span>Sudoku</span>
    </header>
  );
}

export default Header;
