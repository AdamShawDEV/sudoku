import { useState } from "react";
import styles from "./modules/Header.module.css";
import SettingsModal from "./SettingsModal";
import Icon from "./Icon";

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
          {settingHover ? (
            <Icon id="settingsFill" />
          ) : (
            <Icon id="settingsOutline" />
          )}
        </div>
      </header>
      {settingModalOpen && (
        <SettingsModal handleClose={() => setSettingModalOpen(false)} />
      )}
    </>
  );
}

export default Header;
