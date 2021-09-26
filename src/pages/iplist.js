import React,{ useState }  from "react";
import { Container } from "reactstrap";
import CardsList from "../components/CardsList";
import dapp from '../lib/dapp'

let timer;

const IPList = (props) => {
  console.log(props)
  const [ips, ipsUpdate] = useState([])
  if(timer) clearInterval(timer)
  
  timer = setInterval(async ()=>{
      await dapp.connectWallet();
      const _ips = await dapp.getAllIP();
      ipsUpdate([..._ips])
    }, 1000)
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Mint</h1>
          <CardsList iplist={ips} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default IPList;
