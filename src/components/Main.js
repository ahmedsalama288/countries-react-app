import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Country from "./Country";
import Search from "./Search";
import GridItem from "./GridItem";
import axios from "axios";

const iso = require("iso-3166-1");

function Main() {
  // [#] Create Dark Mode State
  const [darkMode, setDarkMode] = React.useState(false);

  // // [#] Create State For Input Errors
  const [checkValid, setCheckValid] = React.useState(true);

  // [#] Create State save The Search Values
  const [countryData, setCountryData] = React.useState({
    name: "",
    region: "",
  });

  // [#] Create State To Save The Information From The API Request
  const [countrysObjs, setCountrysObjs] = React.useState(() => []);

  // [#] Loop Over The Info Objects Array And Create Components
  const gridItems = countrysObjs.map((countryObj) => {
    return (
      <GridItem
        key={countryObj.name}
        name={countryObj.name}
        flag={countryObj.flag}
        population={countryObj.population}
        region={countryObj.region}
        capital={countryObj.capital}
      />
    );
  });

  // [#] Make The Get Request To Get The Json Data
  React.useEffect(() => {
    async function GetJson() {
      // [#] Check If The Country Name Of Typed By The User Equal In The Country Name Arr
      const checkInput = iso.whereCountry(countryData.name);

      // [#] Get Data Obj From The API
      let res = {};

      if (countryData.name !== "") {
        if (typeof checkInput === "object") {
          res = await axios.get(
            `https://restcountries.com/v3.1/name/${countryData.name}`
          );
        } else {
          console.log("[!] Error: Country Not Found");
          res = { error: "Not Found" };
        }
      }
      if (countryData.region !== "") {
        if (countryData.region === "All")
          res = await axios.get("https://restcountries.com/v3.1/all");
        else
          res = await axios.get(
            `https://restcountries.com/v3.1/region/${countryData.region}`
          );
      }
      if (Object.keys(res).length === 0) {
        res = await axios.get("https://restcountries.com/v3.1/all");
      }

      // [#] Get The Information From The Data Obj
      if (res.hasOwnProperty("data")) {
        const countrysInfo = res.data.map((dataObj) => {
          return {
            name: dataObj.name.common,
            region: dataObj.region,
            flag: dataObj.flags.png,
            capital: dataObj.capital,
            population: dataObj.population,
          };
        });
        // [#] Change The State Of countrysInfo
        setCountrysObjs(() => countrysInfo);
        setCheckValid(true)
      } else {
        setCheckValid(false)
      }
    }
    GetJson();
  }, [countryData]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<App darkMode={darkMode} setDarkMode={setDarkMode} />}
        >
          <Route
            index
            element={
              <main className={darkMode ? "dark-mode" : null}>
                <div className="container">
                  <Search
                    countryData={countryData}
                    setCountryData={setCountryData}
                  />
                  {checkValid ? (
                    <section className="countrys-grid">{gridItems}</section>
                  ) : (
                    <section className="error">
                      <h2>Not Found ...</h2>
                    </section>
                  )}
                </div>
              </main>
            }
          />
          <Route
            path="countrys/:countryName"
            element={<Country darkMode={darkMode} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Main;
