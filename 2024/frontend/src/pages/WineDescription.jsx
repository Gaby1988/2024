import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function WineDescription() {
  const { id } = useParams();
  const [selectedWine, setSelectedWine] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/wines/${id}`)
      .then((response) => {
        setSelectedWine(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigateTo("/page-500");
      });
  }, [id]);

  return (
    <div className="wine-desciption-user-container">
      <h2>{selectedWine.name}</h2>
      <div className="pict-wine-and-description-user">
        <img
          src={selectedWine.img_wine}
          alt="wine bottle to buy"
          className="wine-bottle-picture-user"
        />
        <div className="description-line-container">
          <p>{selectedWine.description}</p>
          <div className="vertical-line-next-description-wine" />
        </div>
      </div>
      <Link to="/wine-selection">
        <button type="button" className="primary-button ">
          Retour
        </button>
      </Link>
    </div>
  );
}

export default WineDescription;
