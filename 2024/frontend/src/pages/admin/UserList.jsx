import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/admin/SearchBar";
import DisplayUserList from "../../components/admin/DisplayUserList";

function UserList() {
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  const navigateTo = useNavigate();

  const goToCreateUser = async () => {
    await navigateTo("/admin/create-user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );
        setSearchList(response.data);
      } catch (error) {
        console.error(error);
        navigateTo("/page-500");
      }
    };
    fetchUser();
  }, []);

  const searchListFilter = searchList.filter((element) => {
    if (searchInput.length > 0) {
      const propertyValue = element.firstname.toLowerCase();
      return propertyValue.includes(searchInput.toLowerCase());
    }
    return element;
  });

  return (
    <div className="user-list-page-container">
      <h2>Membres</h2>
      <div className="search-bar-and-button-create">
        <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
        <button
          type="button"
          className="secondary-button"
          onClick={goToCreateUser}
        >
          Créer
        </button>
      </div>
      <ul>
        {searchListFilter.map((user) => {
          return (
            <li key={user.user_id}>
              <DisplayUserList user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default UserList;
