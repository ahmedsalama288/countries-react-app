import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
// import Header from "./Header";
import Country from "./Country";
import Search from "./Search";
import GridItem from "./GridItem";
import axios from "axios";

function Main() {
  // [#] Create State save The Search Values
  const [countryData, setCountryData] = React.useState({
    name: "",
    region: "",
  });
  const [countrysObjs, setCountrysObjs] = React.useState(() => []);

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
      // [#] Get Data Obj From The API
      let res;

      if (countryData.name !== "") {
        res = await axios.get(
          `https://restcountries.com/v3.1/name/${countryData.name}`
        );
      } else if (countryData.region !== "") {
        res = await axios.get(
          `https://restcountries.com/v3.1/region/${countryData.region}`
        );
      } else {
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
        setCountrysObjs(() => countrysInfo);
      }
    }
    GetJson();
  }, [countryData]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <main>
                <div className="container">
                  <Search
                    countryData={countryData}
                    setCountryData={setCountryData}
                  />
                  <section className="countrys-grid">{gridItems}</section>
                </div>
              </main>
            }
          />
          <Route path="countrys/:countryName" element={<Country />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Main;
