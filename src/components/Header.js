import { useState } from "react";
import styles from "./modules/Header.module.css";
import { AiOutlineSetting, AiTwotoneSetting } from "react-icons/ai";
import SettingsModal from "./SettingsModal";

function Header() {
  const [settingHover, setSettingHover] = useState(false);
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <span>Sudoku</span>
        <div
          onMouseEnter={() => setSettingHover(true)}
          onMouseLeave={() => setSettingHover(false)}
          onClick={() => setSettingModalOpen(true)}
        >
          {settingHover ? <AiTwotoneSetting /> : <AiOutlineSetting />}
        </div>
      </header>
      {settingModalOpen && (
        <SettingsModal handleClose={() => setSettingModalOpen(false)} />
      )}
    </>
  );
}

export default Header;
