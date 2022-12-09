import React from "react";

function Header(props) {
  // [#] Change The Dark Mode
  function changeDarkMode() {
    props.setDarkMode((prev) => !prev);
  }

  return (
    <header>
      <div className="header-contaner">
        <h1>Where in the world?</h1>
        <div className="dark-mode" onClick={changeDarkMode}>
          <span className="icon">
            {props.darkMode ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-regular fa-moon"></i>
            )}
          </span>
          <h3>Dark Mode</h3>
        </div>
      </div>
    </header>
  );
}

export default Header;
