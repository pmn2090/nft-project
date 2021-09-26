import React from "react";
import { Table, Button } from "reactstrap";

const OrderItem = (props) => {
  return (
    <>
          <td>#1648</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>
          <Button color="primary">Mint</Button>{' '}
            <Button color="secondary">Withdraw</Button>
          </td>
    </>
  );
};

const OrdersList = (props) => {
  return (
    <div>
      
      <Table className="project-list-table table-nowrap align-middle table-borderless table">
        <thead>
          <tr>
            <th>NFT</th>
            <th>Token Name</th>
            <th>Owner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <OrderItem />
          </tr>
          <tr>
            <OrderItem />
          </tr>
          <tr>
            <OrderItem />
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersList;
