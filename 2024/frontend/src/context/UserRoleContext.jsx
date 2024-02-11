import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const UserInfoContext = createContext({});

function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_id: "",
  });

  const contextTasteNameAndRating = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return (
    <UserInfoContext.Provider value={contextTasteNameAndRating}>
      {children}
    </UserInfoContext.Provider>
  );
}

UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoProvider;
