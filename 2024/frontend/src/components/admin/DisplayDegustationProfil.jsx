import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import modifButton from "../../assets/images/modifButton.png";

export default function DisplayDegustationProfil({ profil }) {
  return (
    <div className="display-profil-container">
      <div className="name-and-edit-by">
        <p>{profil.name}</p>
      </div>
      <div className="buttons-modif-container">
        <Link to={`/admin/degustation-profile/${profil.taste_profile_id}`}>
          <button type="button" className="modif-button">
            <img src={modifButton} alt="button modify a user" />
          </button>
        </Link>
      </div>
    </div>
  );
}

DisplayDegustationProfil.propTypes = {
  profil: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    taste_profile_id: PropTypes.number.isRequired,
  }).isRequired,
};
