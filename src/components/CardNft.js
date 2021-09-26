import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import { Link } from "react-router-dom";
import dapp from '../lib/dapp'

const CardNFT = (props) => {
  console.log('ip:', props.ip.token, props.ip.tokenId)
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="https://lh3.googleusercontent.com/CIFSHxxCbClJDYKVfGbzz4Z3PzcJMokE9Bjp4qwW5zecQIt4UkoYx2hhX1kG7V-E2Kqq_hOMFomofD48psfi880wt5d0U7515wg_ScA=s0"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h2">
            <h4>Bored Ape Yacht Club</h4>
          </CardTitle>
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
          <CardText>
            token: {props.ip.token}
            <br />
            tokenId: {props.ip.tokenId.toString()}
          </CardText>
          {
            props.ip.stake ?
              <Button
                onClick={async () => {
                  const { chainId, accounts } = await dapp.connectWallet();
                  await dapp.MintAndStake(accounts[0], props.ip.tokenId)
                  console.log("hello world", chainId, accounts)
                }}
              >
                Stake IP
              </Button> :
              <Button
              >
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: '/mint',
                    state: { ip: props.ip }
                  }}
                >Mint Derivation</Link>
              </Button>

          }
        </CardBody>
      </Card>
    </div>
  );
};

export default CardNFT;
