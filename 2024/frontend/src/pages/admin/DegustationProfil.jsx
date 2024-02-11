import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayDegustationProfil from "../../components/admin/DisplayDegustationProfil";
import SearchBar from "../../components/admin/SearchBar";

function DegustationProfil() {
  // put the taste profil from the back in the useState
  const [tasteProfileList, setTasteProfileList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigateTo = useNavigate();

  // call all taste profil from bd
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/profil-taste`)
      .then((response) => {
        setTasteProfileList(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigateTo("/page-500");
      });
  }, []);

  // filter of the list of profils
  const searchListFilter = tasteProfileList.filter((element) => {
    if (searchInput.length > 0) {
      const propertyValue = element.name.toLowerCase();
      return propertyValue.includes(searchInput.toLowerCase());
    }
    return element;
  });

  return (
    <div className="degustation-profil-list-container">
      <h2>Profils de Dégustation</h2>
      <div className="search-bar-and-button-create">
        <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
      </div>
      <ul>
        {searchListFilter.map((profil) => {
          return (
            <li key={profil.taste_profile_id}>
              <DisplayDegustationProfil profil={profil} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default DegustationProfil;
