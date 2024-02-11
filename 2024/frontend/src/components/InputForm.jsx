import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MaxLengthContext } from "../context/MaxLengthContext";

function InputForm({ state, setter, type, placeholder }) {
  const { maxl } = useContext(MaxLengthContext);
  const handleChangeForm = (event) => {
    if (event.target.value.length <= maxl) {
      setter(event.target.value);
    }
  };
  return (
    <div className="input-Form-container">
      <input
        className="input-Form"
        type={type}
        required
        value={state}
        onChange={handleChangeForm}
        placeholder={placeholder}
      />
    </div>
  );
}
InputForm.propTypes = {
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default InputForm;
