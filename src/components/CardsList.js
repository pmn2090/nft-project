import React from "react";

import CardNFT from "./CardNft";

const CardsList = (props) => {
  return (
    <div>
      <div class="row">
        {
          props.iplist.map(ip=>
            <div class="col-lg-3">
              <CardNFT ip={ip} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CardsList;
