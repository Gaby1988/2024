import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import modifButton from "../../assets/images/modifButton.png";
import ToggleAdmin from "./ToggleAdmin";

function DisplayUserList({ user }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user.is_admin === 1) {
      setIsAdmin(true);
    }
  }, [user]);

  const handleChangeAdmin = async (event) => {
    const { checked } = event.target;
    setIsAdmin(checked);
    event.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/isadmin/${user.user_id}`,
        {
          is_admin: checked ? 1 : 0,
        }
      );
      if (response.status === 201) {
        console.info("User admin status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user admin status:", error);
    }
  };

  return (
    <div className="user-display-container">
      <div className="email-name-lastname-user">
        <div className="name-lastname-user-admin">
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
        </div>
        <p className="email-container">{user.email}</p>
      </div>
      <div className="icons-and-admin">
        <div className="member-admin-switch">
          <p>Admin</p>
          <ToggleAdmin
            isAdmin={isAdmin}
            handleChangeAdmin={handleChangeAdmin}
          />
        </div>
        <div className="buttons-modif-and-delete">
          <Link to={`/admin/user-list/${user.user_id}`}>
            <button type="button" className="modif-button">
              <img src={modifButton} alt="button modify a user" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

DisplayUserList.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    is_admin: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DisplayUserList;
