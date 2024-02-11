import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const DegustationProfilContext = createContext({});

function DegustationProfilProvider({ children }) {
  const [tasteIdRating, setTasteIdRating] = useState([
    { id: 1, rating: 0 },
    { id: 2, rating: 0 },
    { id: 3, rating: 0 },
    { id: 4, rating: 0 },
  ]);

  const contextTasteNameAndRating = useMemo(
    () => ({
      tasteIdRating,
      setTasteIdRating,
    }),
    [tasteIdRating]
  );

  return (
    <DegustationProfilContext.Provider value={contextTasteNameAndRating}>
      {children}
    </DegustationProfilContext.Provider>
  );
}

DegustationProfilProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DegustationProfilProvider;
