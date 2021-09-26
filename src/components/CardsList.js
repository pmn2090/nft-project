import React from "react";

import CardNFT from "./CardNft";

const CardsList = (props) => {
  return (
    <div>
      <div class="row">
        <div class="col-lg-3">
          <CardNFT />
        </div>
        <div class="col-lg-3">
          <CardNFT />
        </div>
        <div class="col-lg-3">
          <CardNFT />
        </div>
        <div class="col-lg-3">
          <CardNFT />
        </div>
      </div>
    </div>
  );
};

export default CardsList;
