import React from "react";
import logo from "../../../assets/images/logo.png";
import { Header } from "./AuthHeader.style";

const AuthHeader = () => {
  return (
    <Header>
      <img src={logo} alt="" />
    </Header>
  );
};

export default AuthHeader;
