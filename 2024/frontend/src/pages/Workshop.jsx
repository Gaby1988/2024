import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import wireframe from "../assets/images/inovin-atelier.png";
import CepageDosage from "../components/CepageDosage";
import getDate from "../utils/getDate";
import grapesLeaves from "../assets/images/grapesLeaves.png";

function Workshop() {
  const navigateTo = useNavigate();

  const [cepageList, setCepageList] = useState([
    { name: "Loading", cepage_id: 1 },
    { name: "Loading", cepage_id: 2 },
    { name: "Loading", cepage_id: 3 },
    { name: "Loading", cepage_id: 4 },
  ]);
  const [userId, setUserId] = useState(null);
  const [levelListCepage, setLevelListCepage] = useState([
    { cepage: 1, level: 0, user_id: userId, session_date: getDate() },
    { cepage: 2, level: 0, user_id: userId, session_date: getDate() },
    { cepage: 3, level: 0, user_id: userId, session_date: getDate() },
    { cepage: 4, level: 0, user_id: userId, session_date: getDate() },
  ]);

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/cepages`)
      .then((response) => {
        setCepageList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    if (userId !== null && cepageList[0].name !== "Loading") {
      let levelListCepageCopy = [...levelListCepage]; //eslint-disable-line
      for (let i = 0; i < levelListCepageCopy.length; i += 1) {
        if (levelListCepageCopy[i].user_id === null) {
          levelListCepageCopy[i].user_id = userId;
          levelListCepageCopy[i].cepage = cepageList[i].name;
        }
      }
      setLevelListCepage(levelListCepage);
    }
  }, [userId, cepageList]);

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
          setUserId(userInfo.userId);
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

  const handleSubmitLevel = async (e) => {
    e.preventDefault();
    const myArray = levelListCepage.filter((element) => element.level !== "");
    const requests = myArray.map((element) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        element
      );
    });

    Promise.all(requests)
      .then((responses) => {
        if (responses[0].status === 201) {
          toast("Votre recette a bien été enregistrée.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigateTo("/reviews");
        }
      })
      .catch((error) => {
        console.error("Au moins une requête a échoué", error);
        toast(
          "Oups ! Il y a eu un problème. Veuillez bien vérifier les valeurs de votre recette.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };

  return (
    <form className="workshop" onSubmit={(e) => handleSubmitLevel(e)}>
      <img className="grapesLeaves" src={grapesLeaves} alt="grapes" />
      <h2 className="title-page-workshop">Atelier de création</h2>

      <h3 className="title-guide-ctn">Guide :</h3>
      <div className="guide-ctn">
        <img src={wireframe} alt="img-guide" className="img-guide" />
        <div className="content-guide-ctn">
          <ul className="workShopList">
            <div className="guide-step">
              <li className="workshopGuide">Etape 1 :</li>
              <li className="workshopGuide">
                Préparez quatre échantillons de cépages différents dans des
                récipients séparés.
              </li>
            </div>
            <div className="guide-step">
              <li className="workshopGuide">Etape 2 :</li>
              <li className="workshopGuide">
                Utilisez une pipette propre pour prélever une petite quantité de
                chaque échantillon et déposez-les dans un récipient de mélange.
              </li>
            </div>
            <div className="guide-step">
              <li className="workshopGuide">Etape 3 :</li>
              <li className="workshopGuide">
                Mélangez délicatement les échantillons en utilisant la pipette
                pour obtenir un mélange homogène.
              </li>
            </div>

            <div className="guide-step">
              <li className="workshopGuide">Etape 4 :</li>
              <li className="workshopGuide">
                Goûtez régulièrement le mélange pour ajuster les proportions des
                cépages selon votre préférence.
              </li>
            </div>
            <div className="guide-step">
              <li className="workshopGuide">Etape 5 :</li>
              <li className="workshopGuide">
                Une fois satisfait du résultat, transférez le vin assemblé dans
                une bouteille propre à l'aide de la pipette pour le déguster.
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div className="name-level-cepage">
        <div className="cepageAndDosage">
          <h3 className="title-guide-ctn">Cépage : </h3>
          <h3 className="title-guide-ctn">Dosage : </h3>
        </div>
        <div className="cepage-level-container">
          {cepageList.map((cepage) => (
            <CepageDosage
              key={cepage.cepage_id}
              id={cepage.cepage_id}
              cepageName={cepage.name}
              levelListCepage={levelListCepage}
              setLevelListCepage={setLevelListCepage}
            />
          ))}
        </div>
      </div>

      <div className="btn-workshop">
        <Button id="btn-to-go-review" text="Enregistrer" type="submit" />
      </div>
    </form>
  );
}

export default Workshop;
