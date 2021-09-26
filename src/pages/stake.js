import React, { useState } from "react";
import { Container } from "reactstrap";
import CardsList from "../components/CardsList";
import dapp from "../lib/dapp";

let timer;

const Stake = () => {
  const [ips, ipsUpdate] = useState([])
  if(timer) 
    clearTimeout(timer)
  if(ips.length == 0)
  timer = setTimeout(async ()=>{
    await dapp.connectWallet();
    ipsUpdate([{token:dapp.contracts.MockNFT, tokenId:  Math.floor(Math.random()*10000), stake:true}])
    console.log(ips)
  }, 1000)
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Stake</h1>
          <CardsList iplist={ips}/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Stake;
