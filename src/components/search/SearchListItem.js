import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { weatherIcons } from "../../utils/utilityFunctions";
import styles from "../../styles/SearchListItem.module.css";

function SearchListItem({ data: { name, state }, setCoord, setInput, APIKey }) {
  const [coordinates, setCoordinates] = useState({});
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [notFound, setNotFound] = useState(false);

  function handleClick() {
    setCoord(coordinates);
    setInput({ selected: `${name}, ${state}` });
  }

  useEffect(() => {
    // Timer to prevent unnecessary API calls when user is searching for a city
    const timer = setTimeout(async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${APIKey}`
        )
        .then((res) => {
          setCoordinates(res.data.coord);
          setWeather(res.data.weather[0].main);
          setTemp(res.data.main.temp);
        })
        .catch((error) => {
          setNotFound(true);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!notFound ? (
        <div onClick={handleClick} className={styles.listItem}>
          <span>
            {`${name}, `}
            <span className={styles.lightText}>{state}</span>
          </span>
          {temp && (
            <div className={styles.weather}>
              <div className={styles.temp}>
                <span>{Math.round(temp)}°C</span>
                <span className={styles.lightText}>{weather}</span>
              </div>
              <div className={styles.icon}>{weatherIcons(weather)}</div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}

export default memo(SearchListItem);
