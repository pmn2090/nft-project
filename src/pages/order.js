import React from "react";
import { Container } from "reactstrap";
import OrdersList from "../components/OrdersList";

const Order = () => {
  return (
    <React.Fragment>
      <div>
        <Container fluid>
          <h1>Order</h1>
          <OrdersList />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Order;
