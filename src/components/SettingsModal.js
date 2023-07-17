import style from "./modules/SettingsModal.module.css";
import Modal from "./Modal";
import Form from "./Form";
import Button from "./Button";
import ButtonBox from "./ButtonBox";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { useState } from "react";
import { changeSettings } from "../hooks/gameState/actions";
import useTheme from "../hooks/theme/useTheme";

function SettingsModal({ handleClose }) {
  const { settings, dispatch } = useGameState();
  const [showErrors, setShowErrors] = useState(settings.showErrors);
  const { availableThemes, currentTheme } = useTheme();
  const [theme, setTheme] = useState(currentTheme);

  function handleFormSubmit(e) {
    e.preventDefault();

    dispatch(changeSettings({ showErrors, theme }));
    handleClose();
  }

  return (
    <Modal handleClose={handleClose}>
      <Form onSubmit={handleFormSubmit}>
        <h1>setings</h1>
        <div className={style.checkBoxContainer}>
          <label htmlFor="showErrors">show errors: </label>
          <input
            id="showErrors"
            type="checkbox"
            checked={showErrors}
            onChange={(e) => setShowErrors(e.target.checked)}
          />
        </div>
        <div className={style.checkBoxContainer}>
          <label htmlFor="theme">change theme</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {availableThemes.map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>
        </div>
        <ButtonBox style={{ flexDirection: "row" }}>
          <Button onClick={handleClose}>cancel</Button>
          <Button>ok</Button>
        </ButtonBox>
      </Form>
    </Modal>
  );
}

export default SettingsModal;
