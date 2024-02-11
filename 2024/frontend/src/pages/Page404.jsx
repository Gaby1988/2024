import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Background from "../assets/images/broken.jpg";

function Page404() {
  const navigateTo = useNavigate();
  const backToHome = async () => {
    await navigateTo("/");
  };
  return (
    <div className="page-border">
      <div className="page-ctn">
        <h2>Erreur 404</h2>
        <h2>C’est bouchonné ?</h2>
        <div className="btn-home">
          <Button text="Accueil" onClick={backToHome} id="error-page-btn" />
        </div>
      </div>
      <img className="back-img" src={Background} alt="backgroundimage" />
    </div>
  );
}
export default Page404;
