import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputForm from "../components/InputForm";
import WhiteGrape from "../assets/images/whiteGrape.png";
import Berries from "../assets/images/berries.png";
import Button from "../components/Button";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptLegalMentions, setAcceptLegalMentions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptLegalMentions) {
      toast.error("Vous devez accepter les mentions légales !");
      return;
    }

    const body = {
      firstname: firstName,
      lastname: lastName,
      address,
      zip_code: postalCode,
      email,
      city,
      job,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        body
      );

      if (response.status === 201) {
        console.info(
          "Données enregistrées avec succès dans la base de données !"
        );
        toast("Votre compte a bien été créé", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/page-500");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="container_form">
      <img className="rightGrape" src={WhiteGrape} alt="" />
      <img className="berries" src={Berries} alt="berries" />

      <h2 className="title_form">Créer un compte</h2>

      <InputForm
        type="text"
        required
        state={firstName}
        setter={setFirstName}
        placeholder="Prénom*"
      />
      <InputForm
        type="text"
        state={lastName}
        setter={setLastName}
        placeholder="Nom*"
      />

      <InputForm
        state={email}
        setter={setEmail}
        type="email"
        placeholder="Email*"
      />

      <InputForm
        state={password}
        setter={setPassword}
        type="password"
        placeholder="Mot de passe*"
      />

      <InputForm
        type="text"
        required
        state={address}
        setter={setAddress}
        placeholder="Adresse*"
      />
      <div className="container_form_city">
        <div>
          <InputForm
            className="postalCode"
            type="text"
            required
            state={postalCode}
            setter={setPostalCode}
            placeholder="Code postal*"
          />
        </div>
        <div>
          <InputForm
            className="city"
            type="text"
            state={city}
            setter={setCity}
            placeholder="Ville"
          />
        </div>
      </div>
      <InputForm
        type="text"
        state={job}
        setter={setJob}
        placeholder="Fonction"
      />

      <div className="legal-mentions-ctn">
        <input
          type="checkbox"
          id="legalMentions"
          checked={acceptLegalMentions}
          onChange={(e) => setAcceptLegalMentions(e.target.checked)}
        />
        <label htmlFor="legalMentions">
          <Link to="/mentions-legales" className="legal-mentions-link">
            J'accepte les conditions d'utilisation
          </Link>
        </label>
      </div>

      <div className="form_navigate">
        <Button type="submit" className="primary-button" text="Valider" />
        <Link to="/login">
          <p className="form_login_link">Déjà inscrit(e) ?</p>
        </Link>
      </div>
    </form>
  );
}

export default Signup;
