import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const App = () => {
  // [#] Create Dark Mode State
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
    </>
  );
};

export default App;
