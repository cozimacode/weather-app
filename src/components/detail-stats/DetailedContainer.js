import React from "react";
import { weatherIcons, localTime } from "../../utils/utilityFunctions";
import SunChart from "./SunChart";
import styles from "../../styles/DetailedContainer.module.css";
import WeatherChart from "./WeatherChart";

export default function DetailedContainer({ selectedDate, hourly }) {
  let weatherData = hourly.map((hour) => {
    return {
      time: localTime(new Date(hour.dt * 1000)),
      temp: hour.temp,
    };
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tempContainer}>
        <p className={styles.temp}>{Math.round(selectedDate.temp.max)}°C</p>
        <div className={styles.icon}>
          {weatherIcons(selectedDate.weather[0].main)}
        </div>
      </div>
      <WeatherChart data={weatherData} />
      <div className={styles.secondaryStats}>
        <div className={styles.pressure}>
          <span>Pressure</span>
          <p>{selectedDate.pressure} hpa</p>
        </div>
        <div className={styles.humidity}>
          <span>Humidity</span>
          <p>{selectedDate.humidity} %</p>
        </div>
      </div>
      <div className={styles.sunStats}>
        <div className={styles.sunRise}>
          <span>Sunrise</span>
          <p className={styles.lightText}>
            {localTime(new Date(selectedDate.sunrise * 1000))}
          </p>
        </div>
        <div className={styles.sunSet}>
          <span>Sunset</span>
          <p className={styles.lightText}>
            {localTime(new Date(selectedDate.sunset * 1000))}
          </p>
        </div>
      </div>
      <SunChart />
    </div>
  );
}
