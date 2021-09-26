import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import dapp from '../lib/dapp'
const MintForm = (props) => {
  return (
    <div className="mt-5">
      <Form>
        <FormGroup>
          <Label for="Address">IP Token Address</Label>
          <Input
            type="text"
            name="Address"
            id="Address"
            placeholder="Address"
            value={props.ip.token}
            style={{ color: 'black', width: "27em" }}
          />
          <Label for="Address">IP Token Id</Label>
          <Input
            type="text"
            name="Address"
            id="Address"
            placeholder="Address"
            value={props.ip.tokenId}
            style={{ color: 'black', width: "27em" }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="description"
            value="Vtuber Demo"
            style={{ color: 'black', width: "27em" }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="serviceProvider">Service Provider</Label>
          <Input type="select" name="select" id="serviceProvider"

            style={{ color: 'black', width: "27em" }}
          >
            <option>Vtuber</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Agree to the terms and conditions
          </Label>
        </FormGroup>
      </Form>

      <Button className="mt-5"
        color="primary"
        disabled={!props.ip.token}
        onClick={async () => {
          const orderId = await dapp.PlaceOrder();
          console.log("hello world", orderId)
        }}
      >Submit</Button>
    </div>
  );
};

export default MintForm;
