import { Link } from "react-router-dom";
import logoInovin from "../assets/images/logo-inovin.svg";
import vineyard from "../assets/images/vineyard.png";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="homePageDiv">
      <div className="homeBorderDiv">
        <div className="homeContentDiv">
          <img className="logoImage" src={logoInovin} alt="Logo" />
          <div className="homeTextDiv">
            <p className="homeP">Bienvenue</p>
            <p className="homeP">
              Notre atelier Inovin est unique en son genre : vous apprendrez à
              créer votre propre vin en sélectionnant les arômes et les saveurs
              que vous préférez. Vous pourrez ensuite enregistrer la composition
              de votre vin dans notre base de données pour le reproduire à tout
              moment.
            </p>
            <Link to="/sign-up">
              <Button id="homeButton" text="Inscription" />
            </Link>
          </div>
        </div>
        <img className="vineyardImage" src={vineyard} alt="BackgroundImage" />
      </div>
    </div>
  );
}
