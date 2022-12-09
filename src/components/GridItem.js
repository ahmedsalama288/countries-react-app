import React from "react";
import { useNavigate } from "react-router-dom";

function GridItem(props) {
  const navigate = useNavigate();
  function toCountryComponent() {
    navigate(`countrys/${props.name}`);
  }

  return (
    <div className="grid-item" onClick={toCountryComponent}>
      <img src={props.flag} alt="Country Flag" />
      <div className="discription">
        <h3>{props.name}</h3>
        <ul>
          <li>
            Population:{" "}
            <span>
              {props.population.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
            </span>
          </li>
          <li>
            Region: <span>{props.region}</span>
          </li>
          <li>
            Capital: <span>{props.capital}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GridItem;
