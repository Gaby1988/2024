import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { UserInfoContext } from "../context/UserRoleContext";

function PrivateRoutes({ expectedRoles, children }) {
  const { setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const [role, setRole] = useState(undefined);

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
          setRole(userInfo.role);
          setUserInfo(userInfo);
        } else {
          console.error("User information not found");
        }
      } catch (error) {
        console.error("Can not get user data", error);
        navigate("/login");
      }
    };
    fetchUserInformation();
  }, []);

  if (role !== undefined) {
    if (!expectedRoles.includes(role)) {
      console.info("You are not allowed to", role);
      navigate("/login");
    }
  }
  return expectedRoles.includes(role) ? children : null;
}

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  expectedRoles: PropTypes.node.isRequired,
};

export default PrivateRoutes;
