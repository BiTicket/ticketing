import React from "react";

const DarkMode = () => {
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "is_dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(darkTheme);
  }

  return <></>;
};

export default DarkMode;
