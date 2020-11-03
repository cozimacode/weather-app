import React, { useState, useEffect } from "react";
import SearchBar from "./components/search/SearchBar";
import axios from "axios";
import { getIndices, loopingData, getLocation } from "./utils/utilityFunctions";
import styles from "./App.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import DailyForecast from "./components/weather/DailyForecast";
import DetailedContainer from "./components/detail-stats/DetailedContainer";

const APIKey = "d0906c61d6832792d70d26b47f9ae161"; //To do: Set this inside env variable

export default function App() {
  const [coord, setCoord] = useState({ lat: 19.01, lon: 72.85 });
  const [loading, setLoading] = useState(true);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [selectedDate, setDate] = useState({});
  const [indices, setIndices] = useState(getIndices(new Date(), 0));

  useEffect(() => {
    getLocation(setCoord);
  }, []);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&cnt=20&exclude=minutely&units=metric&appid=${APIKey}`
        )
        .then((res) => {
          setHourly(loopingData(res.data.hourly));
          setDaily(res.data.daily);
          setDate(res.data.daily[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchData();
  }, [coord]);

  return loading ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.main}>
      <SearchBar setCoord={setCoord} APIKey={APIKey} />
      {selectedDate.dt && (
        <>
          <DailyForecast
            data={daily}
            setDate={setDate}
            selectedDate={selectedDate.dt}
            setIndices={setIndices}
          />
          <DetailedContainer
            selectedDate={selectedDate}
            hourly={hourly.slice(indices.startIndex, indices.endIndex + 1)}
          />
        </>
      )}
    </div>
  );
}
