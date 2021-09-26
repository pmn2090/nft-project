import React from "react";
import { Container } from "reactstrap";
import CardsList from "../components/CardsList";

const Stake = () => {
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Stake</h1>
          <CardsList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Stake;
