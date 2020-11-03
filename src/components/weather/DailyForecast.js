import React from "react";
import Day from "./Day";
import styles from "../../styles/DailyForecast.module.css";

export default function DailyForecast(props) {
  return (
    <div className={styles.mainContainer}>
      {props.data.map((day, index) => {
        return (
          <Day
            key={day.dt}
            day={Object.assign({}, day, { index })}
            {...props}
          />
        );
      })}
    </div>
  );
}
