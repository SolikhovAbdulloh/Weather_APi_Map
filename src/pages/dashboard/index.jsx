import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { Avatar, Button, Select } from "antd";
import { FaTemperatureHigh } from "react-icons/fa";
import { PiWind } from "react-icons/pi";
import { WiCloudyWindy } from "react-icons/wi";
import "leaflet/dist/leaflet.css";
import axios from "axios";
// --legacy-peer-deps majburiy versiyaga moslashtirish uchun kod
import {
  cloudCoverageColors,
  countries,
  temperatureColors,
  windSpeedColors,
} from "../../utils";

const getColorByWeather = (value, type) => {
  let color = "";
  const colors =
    type === "temperature"
      ? temperatureColors
      : type === "wind"
      ? windSpeedColors
      : cloudCoverageColors;

  for (const range of colors) {
    if (value >= range.range[0] && value < range.range[1]){
      color = range.color;
      break;
    }
  }
  return color;
};

const Map = () => {
  const active = "bg-[#1890ff] text-[#fff]";
  const [weatherData, setWeatherData] = useState({});
  const [selectedWeatherType, setSelectedWeatherType] = useState("temperature");
  useEffect(() => {
    const fetchWeather = async () => {
      const data = {};
      for (const country of countries) {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=5f1b448ffdab40a6952103418252801&q=${country.name}`
          );
          data[country.code] = response.data.current;
        } catch (error) {
          console.error(`Failed to fetch weather for ${country.name}`, error);
        }
      }
      setWeatherData(data);
    };
    fetchWeather();
  }, []);

  const handleButtonClick = (weatherType) => {
    setSelectedWeatherType(weatherType);
  };
  const renderColorTable = (selectedWeatherType) => {
    const colors =
      selectedWeatherType === "temperature"
        ? temperatureColors
        : selectedWeatherType === "wind"
        ? windSpeedColors
        : cloudCoverageColors;

    return (
      <div className="text-[white] pt-3 text-[20px] font-bold">
        <h3>
          {selectedWeatherType === "temperature"
            ? "Temperature"
            : selectedWeatherType === "wind"
            ? "Wind Speed"
            : "Cloud Coverage"}
        </h3>
        <ul className="flex  p-2 items-center gap-[30px] pt-4">
          {colors.map((range, index) => (
            <li key={index} style={{ color: range.color }}>
              {range.label}
              <span
                className={`flex items-center gap-1  p-[1px]`}
                style={{backgroundColor:range.color}}
              >
                Color
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <div className="m-auto  w-[90%] flex-col mb-[10px] items-center py-5 flex">
        <div className="w-[90%] flex justify-between flex-col mb-[50px] items-center p-4 ">
          <div className=" text-center flex items-center gap-[30px]">
            <h1 className="text-[40px] text-[white] font-bold">
              Weather Map in
            </h1>
            <img
              className="w-[100px] cursor-pointer"
              src={
                "https://upload.wikimedia.org/wikipedia/de/thumb/3/35/Uzbekistan_Airways.svg/702px-Uzbekistan_Airways.svg.png?20081005214654"
              }
              alt="logo"
            />
          </div>
          <div className="mt-4 gap-5 flex  items-center justify-center">
            <Button
              onClick={() => handleButtonClick("temperature")}
              className={selectedWeatherType === "temperature" ? active : ""}
            >
              <FaTemperatureHigh />
              Temperature
            </Button>
            <Button
              onClick={() => handleButtonClick("wind")}
              className={selectedWeatherType === "wind" ? active : ""}
            >
              <PiWind />
              Wind Speed
            </Button>
            <Button
              
              onClick={() => handleButtonClick("cloudiness")}
              className={selectedWeatherType === "cloudiness" ? active : ''}
            >
              <WiCloudyWindy  />
              Cloudiness
            </Button>
          </div>
          {renderColorTable(selectedWeatherType)}
        </div>

        <div className="h-[100%] w-[100%] ml-4">
          <MapContainer
            center={[20, 0]}
            zoom={3}
            style={{
              height: "600px",
              width: "100%",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {countries.map((country) => {
              const weather = weatherData[country.code];
              if (weather) {
                const value =
                  selectedWeatherType === "temperature"
                    ? weather.temp_c
                    : selectedWeatherType === "wind"
                    ? weather.wind_kph
                    : weather.cloud;

                const color = getColorByWeather(value, selectedWeatherType);

                return (
                  <CircleMarker
                    key={country.code}
                    center={[country.lat, country.lon]}
                    radius={10}
                    pathOptions={{
                      fillColor: color,
                      color,
                      weight: 5,
                      fillOpacity: 1.6,
                    }}
                  />
                );
              }
              return null;
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
