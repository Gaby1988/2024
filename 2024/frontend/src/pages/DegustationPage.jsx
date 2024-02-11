import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SliderUser from "../components/SliderUser";
import Button from "../components/Button";
import { DegustationProfilContext } from "../context/DegustationProfilContext";
import bgBottle from "../assets/images/bottleneck.png";

function DegustationPage() {
  const { tasteIdRating } = useContext(DegustationProfilContext);
  const [id, setId] = useState(1);
  const urlDegustationProfile = `/degustation-profile/${id}`;

  const [wineListTasting, setWineListTasting] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tastes`)
      .then((response) => {
        setWineListTasting(response.data);
      });
  }, []);

  useEffect(() => {
    if (
      tasteIdRating.filter(
        (element) =>
          element.rating ===
          Math.max(...tasteIdRating.map((item) => item.rating))
      ).length > 1
    ) {
      setId(0);
    } else {
      setId(
        tasteIdRating.find(
          (element) =>
            element.rating ===
            Math.max(...tasteIdRating.map((item) => item.rating))
        ).id
      );
    }
  }, [tasteIdRating]);

  const handleClick = () => {
    toast("Il n'est pas possible d'avoir plusieurs goûts au même niveau.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="DegustationPage" id="DegustationPage">
      <h2 className="title-page">Fiche de Dégustation</h2>

      <p className="title-content">Quels sont vos goûts ?</p>

      <div className="taste-slider-main-ctn">
        <div className="taste-slider-ctn">
          {wineListTasting.map((wine) => (
            <div className="taste-slider">
              <SliderUser
                id={wine.taste_id}
                tasteName={wine.name}
                maxRating={10}
              />
            </div>
          ))}
        </div>
      </div>

      {id === 0 ? (
        <div className="btn-navigate">
          <Button
            text="Valider"
            id="degutation-page-btn"
            onClick={handleClick}
          />
        </div>
      ) : (
        <div className="btn-navigate">
          <a href={urlDegustationProfile}>
            <Button text="Valider" id="degutation-page-btn" />
          </a>
        </div>
      )}
      <img className="bottle-wine-img" src={bgBottle} alt="BackgroundImage" />
    </div>
  );
}

export default DegustationPage;
