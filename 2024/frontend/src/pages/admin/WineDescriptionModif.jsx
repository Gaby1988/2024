import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import pen from "../../assets/images/pen.png";
import ModalPopup from "../../components/ModalPopup";

export default function WineDescriptionModif() {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [selectedWine, setSelectedWine] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgWine, setImgWine] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const wineImgRef = useRef(null);

  const handleImgUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImgWine(reader.result);
    };
    console.info("reader", reader);
    reader.readAsDataURL(file);
  };

  const handleWineImgChange = (e) => {
    const file = e.target.files[0];
    handleImgUpload(file);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/wines/${id}`)
      .then((response) => {
        setSelectedWine(response.data);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, description };
    try {
      if (body.name === null || body.name === "") {
        body.name = selectedWine.name;
      }
      if (body.description === null || body.description === "") {
        body.description = selectedWine.description;
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/wines/${id}`,
        body
      );
      if (response.status === 204) {
        navigateTo("/admin/wine-list");
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
      }
    } catch (error) {
      console.error(error);
      navigateTo("/page-500");
    }
  };

  const handleOnClickSupp = () => {
    setShowConfirmationPopup(true);
  };

  const handleConfirmationDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/wines/${id}`
      );
      if (response.status === 204) {
        setConfirmationMessage("Votre sélection de vin a bien été supprimée");
        setTimeout(() => {
          navigateTo("/admin/wine-list");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      navigateTo("/page-500");
    }
  };

  const handleCloseConfirmationPopup = () => {
    setShowConfirmationPopup(false);
  };

  return (
    <div className="wine-desciption-user-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="modif-title-wine">
          <img src={pen} alt="pic of a pen to modify title" />
          <input
            type="text"
            placeholder={selectedWine.name}
            value={name}
            className="title-wine"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="pict-wine-and-description-user">
          <div className="button-modif-and-pic-wine-bottle">
            <img src={pen} alt="pic of a pen to modify img bottle" />
            <img
              src={imgWine !== null ? imgWine : selectedWine.img_wine}
              alt="wine bottle to buy"
              className="wine-bottle-picture-admin"
              ref={wineImgRef}
            />
            <input
              type="file"
              name="winePicBottle"
              className="file-upload"
              onChange={handleWineImgChange}
            />
          </div>
          <div className="button-modif-and-wine-description">
            <img src={pen} alt="pic of a pen to modify text description" />
            <div className="description-line-container">
              <textarea
                type="text"
                className="description-wine"
                placeholder={selectedWine.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="vertical-line-next-description-wine" />
            </div>
          </div>
        </div>

        <div className="buttons-delete-and-back">
          <button type="submit" className="primary-button ">
            Valider
          </button>

          <button
            type="button"
            onClick={handleOnClickSupp}
            className="primary-button"
          >
            Supprimer
          </button>
        </div>
      </form>

      {showConfirmationPopup && (
        <ModalPopup
          message="Êtes-vous sûr(e) de vouloir supprimer ?"
          onClose={handleCloseConfirmationPopup}
          onConfirm={handleConfirmationDelete}
          confirmationMessage={confirmationMessage}
        />
      )}
    </div>
  );
}
