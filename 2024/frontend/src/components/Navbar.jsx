import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import logoInovin from "../assets/images/logo_inovin_removebg.png";
import UserBurgerMenu from "./UserBurgerMenu";
import AdminBurgerMenu from "./AdminBurgerMenu";

import { UserInfoContext } from "../context/UserRoleContext";

export default function Navbar() {
  const { userInfo } = useContext(UserInfoContext);

  const [showLinks, setShowLinks] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [showNav, setShowNav] = useState(true);

  const location = useLocation();

  const hideNavbarList = ["/"];

  useEffect(() => {
    if (
      hideNavbarList.find(
        (urlHideNavbar) => urlHideNavbar === location.pathname
      )
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location]);

  useEffect(() => {
    setCurrentUrl(window.location.pathname);
  }, []);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className={`nav-container ${showNav ? "" : "hide-navbar"}`}>
      {userInfo.role === 1 ? (
        <Link to="/admin">
          <img src={logoInovin} alt="logo website inovin" />
        </Link>
      ) : (
        <Link to="/">
          <img src={logoInovin} alt="logo website inovin" />
        </Link>
      )}

      {userInfo.role === 1 ? (
        <AdminBurgerMenu
          handleShowLinks={handleShowLinks}
          showLinks={showLinks}
        />
      ) : (
        <UserBurgerMenu
          handleShowLinks={handleShowLinks}
          showLinks={showLinks}
          setShowLinks={setShowLinks}
          currentUrl={currentUrl}
        />
      )}
    </div>
  );
}
