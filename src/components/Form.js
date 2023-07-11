import styles from "./modules/Form.module.css";
import PropTypes from "prop-types";

function Form({ children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
