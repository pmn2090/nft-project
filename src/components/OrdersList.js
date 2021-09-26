import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import dapp from '../lib/dapp'

const sameAddress = (a, b) => a.toLocaleLowerCase() == b.toLocaleLowerCase();

const OrderItem = (props) => {
  const Status = ['None', 'Pending', 'Deliveried', 'Licensed']
  const ButtonName = ['None', 'AddDeliver', 'CompleteOrder', 'Completed']
  return (
    <>
      <td>#{props.order.orderId}</td>
      <td>@vtuber APE</td>
      <td>#{props.order.tokenId.toString()}</td>
      <td>#{props.order.derivativeTokenId.toString()}</td>
      <td>{props.order.user}</td>
      <td>{Status[props.order.status]}</td>
      <td>
        <Button color="primary"
        disabled={props.order.status==3}
          onClick={async () => {
            if(props.order.status == 1)
              await dapp.AddDelivery(props.order.orderId);
            else
              await dapp.CompleteOrder(props.order.orderId)
          }}
        >{ButtonName[props.order.status]}</Button>{' '}
      </td>
    </>
  );
};

let timer;

const OrdersList = (props) => {
  const [orders, orderUpdate] = useState([])
  const delayMs = 1000;
  if(timer) clearInterval(timer);
  timer = setInterval(async ()=>{
    console.log("hello")
    await dapp.connectWallet();
    const newOrders = await dapp.getAllOrders();
    orderUpdate(newOrders.map((order, index) => (order.orderId = index, order)))
  }, delayMs)
  return (
    <div>
      <Table className="project-list-table table-nowrap align-middle table-borderless table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Token Name</th>
            <th>Token Id</th>
            <th>Derivative Id</th>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.filter(order => sameAddress(order.user, dapp.accounts[0])).map((order, index) => {
              return <tr key={index}><OrderItem order={order} orderId={index}></OrderItem></tr>
            })
          }
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersList;
