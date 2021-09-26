import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const MintForm = (props) => {
  return (
    <div className="mt-5">
      <Form>
        <FormGroup>
          <Label for="Address">Address</Label>
          <Input
            type="text"
            name="Address"
            id="Address"
            placeholder="Address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="description"
          />
        </FormGroup>
        <FormGroup>
          <Label for="serviceProvider">Service Provider</Label>
          <Input type="select" name="select" id="serviceProvider">
            <option>Vtuber</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" /> Agree to the terms and conditions
          </Label>
        </FormGroup>
        <Button className="mt-5">Submit</Button>
      </Form>
    </div>
  );
};

export default MintForm;
