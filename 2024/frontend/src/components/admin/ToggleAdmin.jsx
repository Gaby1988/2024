import PropTypes from "prop-types";

function ToggleAdmin({ isAdmin, handleChangeAdmin }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        id="toggle"
        checked={isAdmin}
        onChange={handleChangeAdmin}
      />
      <span className="slider-round" />
    </label>
  );
}
export default ToggleAdmin;

ToggleAdmin.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  handleChangeAdmin: PropTypes.func.isRequired,
};
