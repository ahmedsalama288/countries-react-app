import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const App = (props) => {
  return (
    <>
      <Header darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
      <Outlet />
    </>
  );
};

export default App;
