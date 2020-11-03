import React from "react";
import { weatherIcons, getIndices } from "../../utils/utilityFunctions";
import styles from "../../styles/Day.module.css";

let daysInAWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Day({ day, setDate, selectedDate, setIndices }) {
  let currentDate = new Date(day.dt * 1000);

  function handleClick() {
    setIndices(getIndices(currentDate, day.index));
    setDate(day);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.subContainer} ${
        selectedDate === day.dt ? styles.selected : undefined
      }`}
    >
      <span>{daysInAWeek[currentDate.getDay()]}</span>
      <p>
        <span>{Math.round(day.temp.max)}°</span>{" "}
        <span className={styles.lightText}>{Math.round(day.temp.min)}°</span>
      </p>
      <div className={styles.icon}>{weatherIcons(day.weather[0].main)}</div>
      <span className={styles.lightText}>{day.weather[0].main}</span>
    </div>
  );
}
