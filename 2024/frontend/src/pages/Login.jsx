import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import InputForm from "../components/InputForm";
import WhiteGrape from "../assets/images/whiteGrape.png";
import Berries from "../assets/images/berries.png";

export default function Login() {
  const navigate = useNavigate();

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const fetchUserInformation = async () => {
    let role = 0;
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/userinformation`,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const userInfo = response.data;
        role = userInfo.role;
        if (role === 1) {
          navigate("/admin");
        } else {
          navigate("/degustation");
        }
      } else {
        console.error("User information not found");
      }
    } catch (error) {
      console.error("Can not get user data", error);
    }
  };

  const handleSubmit = async () => {
    const body = {
      email: emailLogin,
      password: passwordLogin,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        body
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        fetchUserInformation();
      }
    } catch (err) {
      console.error(err);
      navigate("/page-500");
    }
  };

  return (
    <div className="login-container-page">
      <img className="rightGrape" src={WhiteGrape} alt="" />
      <img className="berries" src={Berries} alt="berries" />
      <h2>Accéder à votre compte</h2>

      <form onSubmit={handleSubmit}>
        <InputForm
          state={emailLogin}
          setter={setEmailLogin}
          type="email"
          placeholder="Email*"
        />
        <InputForm
          state={passwordLogin}
          setter={setPasswordLogin}
          type="password"
          placeholder="Mot de passe*"
        />
      </form>
      <div className="links-page-login">
        <div className="buttons-container-login-page">
          <button
            className="primary-button"
            type="submit"
            onClick={() => handleSubmit()}
          >
            Connexion
          </button>

          <Link to="/sign-up">
            <p>Inscription</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
