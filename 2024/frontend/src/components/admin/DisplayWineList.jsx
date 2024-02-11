import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import modifButton from "../../assets/images/modifButton.png";

function DisplayWineList({ wine }) {
  return (
    <div className="display-wine-container-for-admin">
      <div className="wine-and-origin">
        <p>{wine.name}</p>
        <p>Origine : {wine.origin}</p>
      </div>
      <div className="date-and-icons-delete-modif">
        <div className="buttons-modif-and-delete">
          <Link to={`/admin/wine-list/${wine.wine_id}`}>
            <button type="button" className="modif-button">
              <img src={modifButton} alt="button modify a user" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

DisplayWineList.propTypes = {
  wine: PropTypes.shape({
    name: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    wine_id: PropTypes.number.isRequired,
  }).isRequired,
};
export default DisplayWineList;
