import React from "react";
import HomePage from "./HomePage";
import MuiAppBar from "../../component/MuiAppBar";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';
import { IconButton } from "@material-ui/core";

export default function ClientLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return(
    <>
      <MuiAppBar />
      <HomePage />
      <IconButton color="inherit" onClick={toggleDarkMode}>
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );    
}