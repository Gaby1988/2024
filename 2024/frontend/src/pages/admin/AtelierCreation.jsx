import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import wineglass from "../../assets/images/wineGlass.png";

export default function AtelierCreation() {
  const navigateTo = useNavigate();
  const [cepageOne, setCepageOne] = useState("");
  const [cepageTwo, setCepageTwo] = useState("");
  const [cepageThree, setCepageThree] = useState("");
  const [cepageFour, setCepageFour] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ListToSendToBack = [];
    if (cepageOne !== "") {
      ListToSendToBack.push({ 1: cepageOne });
    }
    if (cepageTwo !== "") {
      ListToSendToBack.push({ 2: cepageTwo });
    }
    if (cepageThree !== "") {
      ListToSendToBack.push({ 3: cepageThree });
    }
    if (cepageFour !== "") {
      ListToSendToBack.push({ 4: cepageFour });
    }

    ListToSendToBack.map(async (el) => {
      const [nameOfCepage] = Object.values(el);
      const body = { name: nameOfCepage };

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/cepages/${Object.keys(el)}`,
          body
        );
        if (response.status === 204) {
          navigateTo("/admin/home");
        }
      } catch (error) {
        console.error(error);
        navigateTo("/page-500");
      }
    });
    toast("Modifications enregistrées.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigateTo("/admin/home");
  };

  return (
    <div className="reviewsPageDiv">
      <h2 className="reviewsPageH2">Atelier de création</h2>
      <p className="reviewsPageP">
        Choisissez 4 cépages pour votre prochain atelier
      </p>
      <form onSubmit={(e) => handleSubmit(e)} className="reviewsPageDiv">
        <input
          className="cepageInput"
          type="text"
          placeholder="Cépage 1"
          value={cepageOne}
          onChange={(e) => setCepageOne(e.target.value)}
        />
        <input
          className="cepageInput"
          type="text"
          placeholder="Cépage 2"
          value={cepageTwo}
          onChange={(e) => setCepageTwo(e.target.value)}
        />
        <input
          className="cepageInput"
          type="text"
          placeholder="Cépage 3"
          value={cepageThree}
          onChange={(e) => setCepageThree(e.target.value)}
        />
        <input
          className="cepageInput"
          type="text"
          placeholder="Cépage 4"
          value={cepageFour}
          onChange={(e) => setCepageFour(e.target.value)}
        />
        <button className="primary-button" id="reviewsPageButton" type="submit">
          Envoyer
        </button>
      </form>
      <img className="wineGlass" src={wineglass} alt="BackgroundImage" />
    </div>
  );
}
