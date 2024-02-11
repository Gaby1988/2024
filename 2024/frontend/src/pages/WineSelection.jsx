import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CardWine from "../components/CardWine";

export default function WineSelection() {
  const [wineListShop, setwineListShop] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/wines`)
      .then((response) => {
        setwineListShop(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigateTo("/page-500");
      });
  }, []);

  return (
    <div className="wine-selection-container">
      <h2>Sélectionné pour vous</h2>
      <ul className="card-list-container-wine-shop">
        {wineListShop.map((wineBottle) => {
          return (
            <li key={wineBottle.wine_id} className="card-list-wine-shop">
              <Link to={`/wine/${wineBottle.wine_id}`}>
                <CardWine wineBottle={wineBottle} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
