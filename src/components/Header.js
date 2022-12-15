import React from "react";

function Header(props) {
  // [#] Change The Dark Mode
  function changeDarkMode() {
    props.setDarkMode((prev) => !prev);
  }
  // const body = document.getElementsByTagName("body");
  // body.
  if (props.darkMode) {
    document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
  } else {
    document.body.style.backgroundColor = "hsl(0deg, 0%, 92%)";
  }

  return (
    <header className={props.darkMode ? "dark-mode" : null}>
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
          <span>Dark Mode</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
