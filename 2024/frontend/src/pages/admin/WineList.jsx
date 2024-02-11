import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisplayWineList from "../../components/admin/DisplayWineList";
import SearchBar from "../../components/admin/SearchBar";

function WineList() {
  // use this state with the axios and delete the array wineList
  const [wineList, setWineList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/wines`)
      .then((response) => {
        setWineList(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigateTo("/page-500");
      });
  }, []);

  const searchListFilter = wineList.filter((element) => {
    if (searchInput.length > 0) {
      const propertyValue = element.name.toLowerCase();
      return propertyValue.includes(searchInput.toLowerCase());
    }
    return element;
  });

  return (
    <div className="wine-list-page-container">
      <h2>Vins</h2>
      <div className="search-bar-and-button-create">
        <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
      </div>
      <ul>
        {searchListFilter.map((wine) => {
          return (
            <li key={wine.wine_id}>
              <DisplayWineList wine={wine} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default WineList;
