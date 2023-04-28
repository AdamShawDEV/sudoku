import style from "./modules/SettingsModal.module.css";
import Modal from "./Modal";
import Form from "./Form";
import Button from "./Button";
import ButtonBox from "./ButtonBox";
import { useGameState } from "../hooks/gameState/gameStateContext";
import { useState } from "react";
import { changeSettings } from "../hooks/gameState/actions";

function SettingsModal({ handleClose }) {
  const { gameState, dispatch } = useGameState();
  const [showErrors, setShowErrors] = useState(gameState.settings.showErrors);

  function handleFormSubmit(e) {
    e.preventDefault();

    dispatch(changeSettings({ showErrors }));
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
        <ButtonBox style={{ flexDirection: "row" }}>
          <Button onClick={handleClose}>cancel</Button>
          <Button>ok</Button>
        </ButtonBox>
      </Form>
    </Modal>
  );
}

export default SettingsModal;
