import React from "react";
import SearchListItem from "./SearchListItem";
import styles from "../../styles/SearchListContainer.module.css";

export default function SearchListContainer({
  data,
  setCoord,
  setInput,
  APIKey,
}) {
  return (
    <div className={styles.main}>
      {data.map((item) => (
        <SearchListItem
          key={item.id}
          data={item}
          setCoord={setCoord}
          setInput={setInput}
          APIKey={APIKey}
        />
      ))}
    </div>
  );
}
