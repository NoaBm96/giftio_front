import React from "react";
import { Card } from "../../components/Card/Card.style";

const PageNotFound = () => {
  return (
    <Card
      display="flex"
      align="center"
      justify="center"
      p="1rem"
      bgColor="#4d6d6e"
      height="75vh"
      radius="25px"
      style={{ color: "#fff", gap: "1rem" }}
    >
      <h2>404</h2>
      <p>This page could not be found.</p>
    </Card>
  );
};

export default PageNotFound;
