import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Home from "../pages/home";
import Stake from "../pages/stake.js";
import Order from "../pages/order.js";
import Mint from "../pages/mint.js";

const Router = () => {
  return (
    <>
      <div class="container-lg">
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/stake"} component={Stake} />
          <Route exact path={"/order"} component={Order} />
          <Route exact path={"/mint"} component={Mint} />
        </Switch>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Router;
