import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const MaxL = { maxl: 35 };
export const MaxLengthContext = createContext({});

function MaxLengthProvider({ children }) {
  const [maxLength, setMaxLength] = useState({});

  useEffect(() => {
    setMaxLength(MaxL);
  }, []);

  return (
    <MaxLengthContext.Provider value={maxLength}>
      {children}
    </MaxLengthContext.Provider>
  );
}

MaxLengthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MaxLengthProvider;
