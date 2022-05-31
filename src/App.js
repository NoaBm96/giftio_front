import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyle } from "./App.style";
import { ThemeProvider as StyledProvider } from "styled-components";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import GiftWishPanel from "./pages/GiftWishPanel/GiftWishPanel";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#4d6d6e",
    },
  },
});

const styledTheme = {
  main: "#4d6d6e",
  darkMain: "#375152",
};

const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <StyledProvider theme={styledTheme}>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<GiftWishPanel />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </StyledProvider>
    </ThemeProvider>
  );
};

export default App;
