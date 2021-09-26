import React from "react";
import { Container } from "reactstrap";
import MintForm from "../components/MintForm";

const Mint = (props) => {
  const ip = props.location.state && props.location.state.ip ? props.location.state.ip : {tokenId:'', token:''};
  console.log(ip)
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Mint</h1>
          <div className="col-xl-4">
            <MintForm ip={ip}/>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Mint;
