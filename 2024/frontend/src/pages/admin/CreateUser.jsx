import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import ToggleAdmin from "../../components/admin/ToggleAdmin";

export default function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  const password = generateString(10);

  const navigateTo = useNavigate();
  const goToUserList = async () => {
    await navigateTo("/admin/user-list");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      firstname: firstName,
      lastname: lastName,
      address,
      zip_code: postalCode,
      email,
      city,
      job,
      password,
      is_admin: isAdmin,
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
        toast("Le compte a bien été créé !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        goToUserList();
      }
    } catch (err) {
      console.error(err);
      toast("Certains champs ne sont pas valides. Veuillez les modifier.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleChangeAdmin = async (event) => {
    event.preventDefault();
    const { checked } = event.target;
    setIsAdmin(checked);
  };

  return (
    <div className="create-user-container">
      <h2>Créer un compte</h2>
      <div className="slider-admin-user">
        <p>Membre</p>
        <ToggleAdmin isAdmin={isAdmin} handleChangeAdmin={handleChangeAdmin} />
        <p>Admin</p>
      </div>
      <form>
        <InputForm
          state={firstName}
          setter={setFirstName}
          type="text"
          placeholder="Nom *"
        />
        <InputForm
          state={lastName}
          setter={setLastName}
          type="text"
          placeholder="Prénom *"
        />
        <InputForm
          state={email}
          setter={setEmail}
          type="email"
          placeholder="Email*"
        />
        <InputForm
          type="text"
          required
          state={address}
          setter={setAddress}
          placeholder="Adresse*"
        />
        <div className="container_form_city">
          <InputForm
            className="postalCode"
            type="text"
            required
            state={postalCode}
            setter={setPostalCode}
            placeholder="Code postal*"
          />

          <InputForm
            className="city"
            type="text"
            state={city}
            setter={setCity}
            placeholder="Ville"
          />
        </div>
        <InputForm
          type="text"
          state={job}
          setter={setJob}
          placeholder="Fonction"
        />
      </form>

      <Button
        type="submit"
        className="primary-button"
        text="Valider"
        onClick={handleSubmit}
      />
    </div>
  );
}
