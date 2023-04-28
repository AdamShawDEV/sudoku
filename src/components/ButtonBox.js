import styles from "./modules/ButtonBox.module.css";
import PropTypes from "prop-types";

function ButtonBox({ children, style }) {
  return (
    <div className={styles.buttonBox} style={style}>
      {children}
    </div>
  );
}

ButtonBox.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ButtonBox;
