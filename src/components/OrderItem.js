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

const OrderItem = (props) => {
  return (
    <div>
          <td>#1648</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>
          <Button color="primary">Mint</Button>{' '}
          <Button color="secondary">Withdraw</Button>
          </td>
    </div>
  );
};

export default OrderItem;
