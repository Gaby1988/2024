import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import pen from "../../assets/images/pen.png";

export default function ModifButton({ onClick, id }) {
  const [showModifButton, setShowModifButton] = useState(true);
  const location = useLocation();

  // show moddif button if current url is admin/tasting sheet
  const hideModifButtonUrl = ["/degustation"];

  useEffect(() => {
    if (
      hideModifButtonUrl.find(
        (urlModifButton) => urlModifButton === location.pathname
      )
    ) {
      setShowModifButton(false);
    } else {
      setShowModifButton(true);
    }
  }, [showModifButton]);

  return (
    <button
      className={`modification-button ${
        showModifButton ? "" : "hide-button-modif"
      }`}
      id={id}
      onClick={onClick}
      type="button"
    >
      <img
        src={pen}
        alt="boutton de modification pour le titre"
        className="pen-img"
      />
    </button>
  );
}

// Definition of expected props types with PropTypes.

ModifButton.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
};

// By providing the defaultProps declaration, you specify a default value for the props.

ModifButton.defaultProps = {
  onClick: () => {},
  id: undefined,
};
