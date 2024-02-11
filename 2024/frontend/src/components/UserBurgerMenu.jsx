import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import wineLeaf from "../assets/images/wineLeaf.png";

export default function UserBurgerMenu({
  handleShowLinks,
  showLinks,
  setShowLinks,
}) {
  // hide or show burger menu
  const [showBurger, setShowBurger] = useState(true);

  const urlPageListHideBurgerMenu = ["/login", "/sign-up", "/degustation"];

  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setShowLinks(false);
  };

  useEffect(() => {
    if (urlPageListHideBurgerMenu.find((url) => url === location.pathname)) {
      setShowBurger(false);
    } else {
      setShowBurger(true);
    }
  });

  return (
    <div className="container-burger-menu">
      <div className={`nav-links ${showLinks ? "show-nav" : ""}`}>
        <ul>
          <a href="/profile">
            <li>Profil</li>
          </a>
          <a href="/workshop">
            <li>Atelier</li>
          </a>
          <a href="/wine-selection">
            <li>Boutique</li>
          </a>
          <a href="/">
            <button
              type="submit"
              className="link-deconnection-admin"
              onClick={logout}
            >
              Déconnexion
            </button>
          </a>
        </ul>

        <button
          type="button"
          className={`menu-burger ${showBurger ? "" : "hide-burger-menu"}`}
          onClick={handleShowLinks}
        >
          <div className="burger-bar" />
        </button>
        <img className="wineLeaf" src={wineLeaf} alt="wine leaf" />
      </div>
    </div>
  );
}

UserBurgerMenu.propTypes = {
  handleShowLinks: PropTypes.func.isRequired,
  showLinks: PropTypes.bool.isRequired,
  setShowLinks: PropTypes.func.isRequired,
};
