import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { DegustationProfilContext } from "../context/DegustationProfilContext";

function SliderRating(props) {
  const { maxRating, onChange, tasteName, id } = props;
  const [rating, setRating] = useState(0);
  const [showModifImg, setShowModifImg] = useState(true);

  const { tasteIdRating, setTasteIdRating } = useContext(
    DegustationProfilContext
  );

  const location = useLocation();
  const hideModifImgUrl = ["/degustation"];

  useEffect(() => {
    if (
      hideModifImgUrl.find((urlModifImg) => urlModifImg === location.pathname)
    ) {
      setShowModifImg(false);
    } else {
      setShowModifImg(true);
    }
  }, [showModifImg]);

  const handleSliderChange = (event) => {
    const newRating = parseInt(event.target.value, 10);
    setRating(newRating);
    onChange(newRating);
  };

  useEffect(() => {
    let tasteIdRatingCopy = [...tasteIdRating]; // eslint-disable-line
    for (let i = 0; i < tasteIdRatingCopy.length; i += 1) {
      if (tasteIdRatingCopy[i].id === id) {
        tasteIdRatingCopy[i].rating = rating;
      }
    }
    setTasteIdRating(tasteIdRatingCopy);
  }, [rating]);

  return (
    <div className="sliderRating">
      <div className="taste-info">
        <div className="taste-name">{tasteName}</div>
        <div className="taste-rating">{rating}</div>
      </div>
      <input
        type="range"
        min="0"
        max={maxRating}
        value={rating}
        onChange={handleSliderChange}
        className="my-slider"
      />
    </div>
  );
}

SliderRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  tasteName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SliderRating;
