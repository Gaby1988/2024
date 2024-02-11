import PropTypes from "prop-types";

export default function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <div className="search-bar-container-admin">
      <input
        type="text"
        placeholder="Recherche"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
};
