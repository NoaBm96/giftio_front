import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Main from "../Main/Main";
import { Container } from "./GiftWishPanel.style";

const GiftWishPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("profile")) {
      navigate("signin");
    }
  }, [navigate]);

  return (
    <Container>
      <Navbar />
      <Main />
    </Container>
  );
};

export default GiftWishPanel;
