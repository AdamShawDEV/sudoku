import PropTypes from "prop-types";
import styles from "./modules/Button.module.css";
import InlineSpinner from "./InlineSpinner";

function Button({
  children,
  onClick,
  pendingOperation,
  disabled,
  type = "none",
}) {
  return (
    <button
      className={styles.button}
      style={type === "delete" ? { backgroundColor: "red" } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      {pendingOperation ? <InlineSpinner /> : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  pendingOperation: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
