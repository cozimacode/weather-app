import React, { useState } from "react";
import { Pin, MagnifyingGlass } from "../../assets";
import SearchListContainer from "./SearchListContainer";
import data from "../../data/indianCitiesStates.json";
import styles from "../../styles/SearchBar.module.css";

export default function SearchBar({ setCoord, APIKey }) {
  const [input, setInput] = useState("");
  const [cityStateData, setData] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
    let filteredData = data.filter(
      (city) =>
        city.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    setData(filteredData);
  };

  return (
    <div className={styles.searchBar}>
      <Pin className={styles.pin} />
      <input
        onChange={handleChange}
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        value={input.selected || input}
      />
      <MagnifyingGlass className={styles.magnifyingGlass} />
      {typeof input === "string" && input && (
        <SearchListContainer
          data={cityStateData}
          setCoord={setCoord}
          setInput={setInput}
          APIKey={APIKey}
        />
      )}
    </div>
  );
}
