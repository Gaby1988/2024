import React, { useState } from "react";
import ModalPopup from "../components/ModalPopup";

function MyComponent() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
    // Perform any additional actions on popup close
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
    // Perform any additional actions on popup open
  };

  return (
    <div>
      <button
        className="primary-button"
        type="submit"
        onClick={handleOpenPopup}
      >
        Open Popup
      </button>
      {showPopup && (
        <ModalPopup
          message="Êtes-vous sûr(e) de vouloir supprimer ?"
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default MyComponent;
