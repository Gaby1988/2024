import axios from "axios";
import { Rating } from "primereact/rating";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import wineglass from "../assets/images/wineGlass.png";

export default function Reviews() {
  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios({
          method: "POST",
          url: `${import.meta.env.VITE_BACKEND_URL}/api/userinformation`,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const userInfo = response.data;
          setFirstName(userInfo.name);
          setLastName(userInfo.surname);
          setEmail(userInfo.email);
        } else {
          console.error("User information not found");
        }
      } catch (error) {
        console.error("Can not get user data", error);
        navigateTo("/page-500");
      }
    };
    fetchUserInformation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { firstName, lastName, email, message, rating };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        body
      );
      if (response.status === 201) {
        navigateTo("/wine-selection");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToWineSelection = async () => {
    await navigateTo("/wine-selection");
    toast("Votre message a bien été transmis !", {
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
    <div className="reviewsPageDiv">
      <h2 className="reviewsPageH2">Votre avis</h2>
      <p className="reviewsPageP">Qu'avez-vous pensé de l'atelier ?</p>
      <form onSubmit={(e) => handleSubmit(e)} className="reviewsPageDiv">
        <div className="nameDiv">
          <input
            className="reviewsInput nameInput"
            type="text"
            placeholder="Nom *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="reviewsInput"
            type="text"
            placeholder="Prénom *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <input
          className="longInput"
          type="text"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="longInput"
          type="text"
          placeholder="Message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="starsDiv card flex justify-content-center">
          <Rating
            className="stars"
            cancel={false}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <button
          className="primary-button"
          id="reviewsPageButton"
          type="submit"
          onClick={goToWineSelection}
        >
          Envoyer
        </button>
      </form>
      <img className="wineGlass" src={wineglass} alt="BackgroundImage" />
      <a href="/wine-selection">
        <p className="reviewsPageP nextTimeP">Une prochaine fois peut-être ?</p>
      </a>
    </div>
  );
}
