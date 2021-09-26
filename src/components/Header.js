import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mt-3 mb-3">
      <Navbar expand="md">
        <NavbarBrand href="/">
          <h3>NFT^2 </h3>
        </NavbarBrand>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/stake">
                  <h5>Stake</h5>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/order">
                  <h5>Order</h5>
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/mint">
                  <h5>Mint</h5>
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Button color="primary" size="lg">Connect Wallet</Button>
      </Navbar>
      
    </div>
  );
};

export default Header;
