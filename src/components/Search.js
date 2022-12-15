import React, { useState } from "react";

function Search(props) {
  // [#] Create Local State To Track The Display Options of Regions.
  const [displayUl, setDisplayUl] = useState(false);

  // [#] Handle The Input Feild Content And update The State
  function handleInput(event) {
    // [#] If User Press Enter Change The State Name property
    if (event.key === "Enter") {
      const countryname = event.target.value;
      props.setCountryData(() => ({ name: countryname, region: "" }));
    }
  }

  // [#] Controle The Display Of The Ul Options
  function displayOptions() {
    setDisplayUl((prev) => !prev);
  }

  // [#] Get The Value Of The Selected Option And Update The State Value
  function ulClicked(event) {
    // [#] Change The State Region property
    displayOptions();
    const region = event.target.innerHTML;
    // [!] Set The Value Of Country Name: "" to Avoid any Get Request To This Country
    props.setCountryData(() => ({ name: "", region: region }));
  }

  return (
    <section className="search">
      <div className="country">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          onKeyPress={handleInput}
          type="text"
          placeholder="Search for a country..."
        />
      </div>

      <div className="region">
        <div className="filter" onClick={displayOptions}>
          <h3>Filter by Region</h3>
          <i className="fa-solid fa-angle-down"></i>
        </div>

        {displayUl && (
          <ul onClick={ulClicked}>
            <li>All</li>
            <li>Africa</li>
            <li>America</li>
            <li>Asia</li>
            <li>Europe</li>
            <li>Oceania</li>
          </ul>
        )}
      </div>
    </section>
  );
}

export default Search;
