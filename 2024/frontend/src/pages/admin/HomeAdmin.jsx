import { Link } from "react-router-dom";
import profilePicture from "../../assets/images/profilePicture.png";
import grapesLeaves from "../../assets/images/grapesLeaves.png";

function HomeAdmin() {
  return (
    <div className="home-page-admin-container">
      <img className="profileImage" src={profilePicture} alt="Profile" />
      <img className="grapeLeafs" src={grapesLeaves} alt="grapeLeaves" />
      <div className="link-list-home-admin">
        <ul>
          <Link to="/admin/degustation-profil-list">
            <li>Profils de Dégustation</li>
          </Link>
          <Link to="/admin/degustation">
            <li>Fiche de Dégustation</li>
          </Link>
          <Link to="/admin/workshop">
            <li>Atelier de Création</li>
          </Link>
          <Link to="/admin/user-list">
            <li>Membres</li>
          </Link>
          <Link to="/admin/wine-list">
            <li>Fiches de Vins</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
export default HomeAdmin;
