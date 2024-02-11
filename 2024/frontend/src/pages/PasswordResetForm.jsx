import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import Button from "../components/Button";

function PasswordResetForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
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
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/page-500");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="container_password_reset_form">
      <h2 className="title_password_reset_form">Renseignez votre email</h2>

      <div className="password_reset_form_input_component">
        <InputForm
          state={password}
          setter={setPassword}
          type="password"
          placeholder="mot de passe*"
        />
        <InputForm
          state={passwordConfirm}
          setter={setPasswordConfirm}
          type="password"
          placeholder="confirmer le mot de passe*"
        />
      </div>

      <div className="password_reset_form_input_component_navigate">
        <Button
          type="submit"
          className="primary-button"
          text="Réinitialiser le mot de passe"
        />
        <Link to="/login">
          <p>Retour</p>
        </Link>
      </div>
    </form>
  );
}

export default PasswordResetForm;
