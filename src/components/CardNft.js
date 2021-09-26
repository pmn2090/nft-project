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

const CardNFT = (props) => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="https://news.artnet.com/app/news-upload/2021/09/Yuga-Labs-Bored-Ape-Yacht-Club-4466.jpg"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h2">
            <h4>Bored Ape Yacht Club</h4>
          </CardTitle>
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button>Stake</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardNFT;
