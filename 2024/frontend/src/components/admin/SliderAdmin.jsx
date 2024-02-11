import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import pen from "../../assets/images/pen.png";

export default function SliderAdmin(props) {
  const { tasteName, nameListTaste, setNameListTaste, id } = props;
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");

  const handleSliderChange = (event) => {
    const newRating = parseInt(event.target.value, 10);
    setRating(newRating);
  };

  useEffect(() => {
    let nameListTasteCopy = [...nameListTaste]; //eslint-disable-line
    for (let i = 0; i < nameListTasteCopy.length; i += 1) {
      if (nameListTasteCopy[i].taste_id === id) {
        nameListTasteCopy[i].name = name;
      }
    }
    setNameListTaste(nameListTasteCopy);
  }, [name]);

  return (
    <div className="sliderRating">
      <div className="taste-info">
        <div className="name-and-pen-modif">
          <input
            type="text"
            placeholder={tasteName}
            value={name}
            className="taste-name"
            onChange={(e) => setName(e.target.value)}
          />
          <img src={pen} alt="pen to modify name of the taste" />
        </div>
        <div className="taste-rating">{rating}</div>
      </div>

      <input
        type="range"
        min="0"
        max={5}
        value={rating}
        onChange={handleSliderChange}
        className="my-slider"
      />
    </div>
  );
}

SliderAdmin.propTypes = {
  tasteName: PropTypes.string.isRequired,
  setNameListTaste: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  nameListTaste: PropTypes.shape({
    name: PropTypes.string.isRequired,
    taste_id: PropTypes.number.isRequired,
  }).isRequired,
};
