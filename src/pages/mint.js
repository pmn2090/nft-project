import React from "react";
import { Container } from "reactstrap";
import MintForm from "../components/MintForm";

const Mint = () => {
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Mint</h1>
          <div className="col-xl-4">
            <MintForm />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Mint;
