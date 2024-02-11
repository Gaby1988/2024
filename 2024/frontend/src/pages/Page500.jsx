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
        <h2>Erreur 500</h2>
        <p>Une erreur interne est survenue sur notre site.</p>
        <p> Veuillez réessayer ultérieurement.</p>{" "}
        <p>Merci de votre compréhension.</p>
        <div className="btn-home">
          <Button text="Accueil" onClick={backToHome} id="error-page-btn" />
        </div>
      </div>
      <img className="back-img" src={Background} alt="backgroundimage" />
    </div>
  );
}
export default Page404;
