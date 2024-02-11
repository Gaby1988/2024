import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Assemblage from "../assets/images/Assemblage.webp";
import ShopCave from "../assets/images/ShopCave.png";
import vineLeaf from "../assets/images/vineleaf.svg";
import Button from "../components/Button";

function DegustationProfile() {
  const { id } = useParams();
  const [profilTaste, setProfilTaste] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/profil-taste/${id}`)
      .then((response) => {
        setProfilTaste(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigateTo("/page-500");
      });
  }, [id]);

  const buttonDirection = async () => {
    navigateTo("/degustation");
  };

  return (
    <div className="degustation-profile-container">
      <div className="degustation-header">
        <h2>Votre profil de dégustation</h2>
        <h3 className="profileTitle">{profilTaste.name}</h3>
        <p>{profilTaste.description}</p>
      </div>
      <div className="path-select-ctn">
        <div className="assemblez-vin">
          <h3 className="title-h3">Assemblez votre vin</h3>
          <div>
            <a href="/workshop">
              <img src={Assemblage} alt="empty" />
              <p className="selection-text"> L'Atelier </p>
            </a>
          </div>
        </div>
        <div className="selection-vin">
          <h3 className="title-h3">Nous avons sélectionné pour vous</h3>
          <a href="/wine-selection">
            <img src={ShopCave} alt="empty" />
            <p className="selection-text"> La Cave </p>
          </a>
        </div>
      </div>
      <h4 className="title-h4">Ce profil ne vous correspond pas ?</h4>
      <div className="button-deg">
        <Button
          text="Retour "
          onClick={buttonDirection}
          id="Degustation-profile-button"
        />
      </div>
      <img className="wineleaf-bg-img" src={vineLeaf} alt="BackgroundImage" />
    </div>
  );
}

export default DegustationProfile;
