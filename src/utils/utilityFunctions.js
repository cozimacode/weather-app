import React from "react";
import { Sun, Haze, Smoke, Mist, Clouds, Fog, Rain } from "../assets";

export function weatherIcons(weather) {
  switch (weather) {
    case "Clear":
      return <Sun />;
    case "Haze":
      return <Haze />;
    case "Smoke":
      return <Smoke />;
    case "Mist":
      return <Mist />;
    case "Clouds":
      return <Clouds />;
    case "Fog":
      return <Fog />;
    case "Rain":
      return <Rain />;
    default:
      return null;
  }
}

export function localTime(date) {
  return date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function getDateInMs(date) {
  let dateInMs = date.setHours(0, 0, 0, 0);
  return dateInMs / 1000;
}

export function getSunData(date, sunRise) {
  let dataArray = new Array(24);
  let modifiedArray = [];
  for (let x = 0; x < dataArray.length; x++) {
    let time = getDateInMs(date) + 3600 * x;
    let uv;
    if (x < 12) {
      uv = time - sunRise;
    } else {
      uv = modifiedArray[x - 1].uv - 3600;
    }

    modifiedArray.push({
      uv,
      hour: x,
    });
  }

  return modifiedArray;
}

export function getIndices(date, index) {
  let startIndex;
  let endIndex;
  let todaysDate = new Date();

  if (date.getDate() === todaysDate.getDate()) {
    startIndex = 0;
    endIndex = 24 - todaysDate.getHours();
  } else {
    startIndex = 24 - todaysDate.getHours() + 24 * (index - 1);
    endIndex = startIndex + 24;
  }
  return { startIndex, endIndex };
}

export function loopingData(array) {
  let extendedArray = [];
  for (let x = 0; x < 4; x++) {
    extendedArray = [...extendedArray, ...array];
  }
  return extendedArray;
}

export function getLocation(setCoord) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function success({ coords: { latitude, longitude } }) {
        setCoord({ lat: latitude, lon: longitude });
      },
      function error(error) {
        console.log(error);
        setCoord({ lat: 19.01, lon: 72.85 });
      }
    );
  } else setCoord({ lat: 19.01, lon: 72.85 });
}
