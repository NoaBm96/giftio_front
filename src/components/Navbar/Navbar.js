import React from "react";
import logo from "../../assets/images/logo.png";
import { Card, CardFlex } from "../Card/Card.style";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Button } from "@mui/material";
import { User } from "./Navbar.style";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const user = JSON.parse(sessionStorage.getItem("profile"));

const Navbar = () => {
  return (
    <Card bgColor="#4d6d6e" radius="none" p="0.2rem 1rem">
      <CardFlex
        justify="space-between"
        align="center"
        wrap="wrap"
        style={{ margin: "auto" }}
      >
        <img src={logo} alt="" style={{ width: "4rem", height: "4rem" }} />
        <CardFlex>
          <CardFlex>
            <Button
              component={Link}
              sx={{ color: "#fff" }}
              to="/"
              startIcon={<CardGiftcardIcon />}
            >
              Wish List
            </Button>
            <Button
              component={Link}
              sx={{ color: "#fff" }}
              to="/friends"
              startIcon={<PeopleAltIcon />}
            >
              Friends
            </Button>
          </CardFlex>
          <CardFlex gap="0.3rem">
            <Button
              component={Link}
              sx={{ color: "#fff" }}
              to="/signin"
              startIcon={<LogoutIcon />}
            >
              Sign Out
            </Button>
            {user && (
              <User>{user?.result?.givenName?.charAt(0).toUpperCase()}</User>
            )}
          </CardFlex>
        </CardFlex>
      </CardFlex>
    </Card>
  );
};

export default Navbar;
