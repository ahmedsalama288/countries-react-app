import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const iso = require("iso-3166-1");

const Country = () => {
  // [#] Get The Country Name From The URL
  const { countryName } = useParams();

  // [#] Create State To Save The API Data Obj
  const [countryInfo, setContryInfo] = React.useState({});

  // [#] Use useEffect Hook To Make Get Request Once
  React.useEffect(() => {
    // [#] Make Get Request To Get The Information About The Country
    async function getCountryInfo() {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      // [#] Save The Data In The ContryInfo State
      setContryInfo(() => res.data[0]);
    }
    getCountryInfo();
  }, [countryName]);

  // [#] Check If The State Obj Get The Data From The API
  const display = Object.keys(countryInfo).length !== 0;

  // [#] Get The Information I Need To Display In The Component
  let infoObj;
  let borderContrys = [];
  if (display) {
    // [#] Destruction The Info From The Data Object
    infoObj = {
      population: countryInfo.population,
      region: countryInfo.region,
      subregion: countryInfo.subregion,
      capital: countryInfo.capital,
      tld: countryInfo.tld[0],
      currencies: Object.values(countryInfo.currencies)[0].name,
      languages: Object.values(countryInfo.languages),
      flag: countryInfo.flags.svg,
      borders: countryInfo.borders ? countryInfo.borders : [],
    };

    // [#] If The Country Have borders Countrys
    if (infoObj.borders.length !== 0) {
      borderContrys = infoObj.borders.map((alpha3) => {
        // [#] Convert The Alpha3 Code To Country Name
        const name = iso.whereAlpha3(alpha3).country;
        return (
          <Link to={`/countrys/${name}`} className="border-contry" key={name}>
            {name}
          </Link>
        );
      });
    }
  }

  return (
    <section className="country-compo">
      {display && (
        <>
          <div className="go-back">
            <Link to="/" className="back-btn">
              <i className="fa-solid fa-arrow-left-long"></i>
              <span>Back</span>
            </Link>
          </div>

          <div className="country-info">
            <div className="image">
              <img src={infoObj.flag} alt={countryName} />
            </div>

            <div className="info">
              <h2>{countryName}</h2>
              <div className="info-lists">
                <ul>
                  <li>
                    Name: <span>{countryName}</span>
                  </li>
                  <li>
                    Population:{" "}
                    <span>
                      {infoObj.population
                        .toString()
                        .replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                    </span>
                  </li>
                  <li>
                    Region: <span>{infoObj.region}</span>
                  </li>
                  <li>
                    Sub Region: <span>{infoObj.subregion}</span>
                  </li>
                  <li>
                    Capital: <span>{infoObj.capital}</span>
                  </li>
                </ul>

                {/* List Two */}
                <ul>
                  <li>
                    Top Level Domain: <span>{infoObj.tld}</span>
                  </li>
                  <li>
                    Currencies: <span>{infoObj.currencies}</span>
                  </li>
                  <li>
                    Languages: <span>{infoObj.languages.join(", ")}</span>
                  </li>
                </ul>
              </div>
              {infoObj.borders.length !== 0 && (
                <div className="border-container">
                  <h3>Border Countrys: </h3>
                  {borderContrys}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Country;
