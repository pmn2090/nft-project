import {connect} from './metamask';
import {InitContracts, AttachDerivative} from './contracts';
let contracts = {};
const ArrayToObj = (arrayObj) => {
    window.x = arrayObj;
    return Object.keys(arrayObj)
      .filter((key) => isNaN(Number(key)))
      .reduce((obj, key) => ((obj[key] = arrayObj[key]), obj), {});
  };
class Dapp {
    chainId;
    accounts;
    contracts={};
    orderId;
    orderStatus;
    derivativeContract;
    derivativeTokenId;
    orderList = [];
    ipList = [];

    async connectWallet() {
      const { chainId, accounts } = await connect();
      this.chainId = Number(chainId);
      this.accounts = accounts;
      dapp.initContracts();
      return { chainId, accounts }
    }
    initContracts() {
      contracts = InitContracts(this.chainId);
      Object.keys(contracts).forEach((name) => {
        console.log(contracts[name].address);
        this.contracts[name] = contracts[name].address;
      });
      return contracts;
    }
    async MintAndStake(to, tokenId) {
      const MockNFT = contracts.MockNFT;
      const IPPool = contracts.IPPool;
      const txmint = await MockNFT.mint(to, tokenId);
      await txmint.wait(1);
      const txapprove = await MockNFT.approve(IPPool.address, tokenId);
      await txapprove.wait(1);
      const txStake = await IPPool.deposit(MockNFT.address, tokenId);
      await txStake.wait(1);
    }
    async unstake(address, tokenId) {
      const IPPool = contracts.IPPool;
      const txStake = await IPPool.withdraw(address, tokenId);
      await txStake.wait(1);
    }
    async PlaceOrder() {
      const DerivativeFactory = contracts.DerivativeFactory;
      const originalNFT = contracts.MockNFT.address;
      const originalTokenId = 1234; // this token already staked in the IP pool
      const serviceId = 0; // this service already registered
      const tx = await DerivativeFactory.place_order(
        originalNFT,
        originalTokenId,
        serviceId
      ); // wait tx send to network
      const receipt = await tx.wait(1); // get receipt of tx, this mean tx is included in a block.
      // parse log and find PlaceOrder to get orderId;
      const filterTopic = DerivativeFactory.filters.PlaceOrder().topics[0];
      const log = receipt.logs.find((log) => log.topics[0] == filterTopic);
      const orderEvent = DerivativeFactory.interface.parseLog({
        data: log.data,
        topics: log.topics,
      });
      console.log("orderEvent args:", orderEvent.args);
      this.orderId = orderEvent.args.orderId;
      this.orderStatus = "Pending";
      return {orderId: this.orderId, status: this.orderStatus}
    }
    async AddDelivery(orderId = this.orderId) {
      const DerivativeFactory = contracts.DerivativeFactory;
      const tokenURI = "https://ipfs/xxxx";
      const tx = await DerivativeFactory.add_delivery(orderId, tokenURI); // wait tx send to network
      const receipt = await tx.wait(1); // get receipt of tx, this mean tx is included in a block.
      // parse log and find PlaceOrder to get orderId;
      const filterTopic = DerivativeFactory.filters.AddDelivery().topics[0];
      const log = receipt.logs.find((log) => log.topics[0] == filterTopic);
      const deliveryEvent = DerivativeFactory.interface.parseLog({
        data: log.data,
        topics: log.topics,
      });
      console.log("deliveryEvent args:", deliveryEvent.args);
      this.derivativeContract = deliveryEvent.args.derivativeContract;
      this.derivativeTokenId = deliveryEvent.args.derivativeTokenId;
      this.orderStatus = "Deliveried";
      return {orderId: this.orderId, status: this.orderStatus, derivativeContract:this.derivativeContract, derivativeTokenId:deliveryEvent.args.derivativeTokenId}
    }
    async CompleteOrder(orderId = this.orderId) {
      const DerivativeFactory = contracts.DerivativeFactory;
      const tx = await DerivativeFactory.complete_order(orderId); // wait tx send to network
      const receipt = await tx.wait(1); // get receipt of tx, this mean tx is included in a block.
      // parse log and find PlaceOrder to get orderId;
      const filterTopic = DerivativeFactory.filters.CompleteOrder().topics[0];
      const log = receipt.logs.find((log) => log.topics[0] == filterTopic);
      const completeEvent = DerivativeFactory.interface.parseLog({
        data: log.data,
        topics: log.topics,
      });
      console.log("completeEvent args:", completeEvent.args);
      this.licenseId = completeEvent.args.licenseId.toHexString();
      this.orderStatus = "Completed";
      return {orderId: this.orderId, 
        status: this.orderStatus, 
        derivativeContract:this.derivativeContract,
         licenseId: this.licenseId,
        }
    }

    async derivativeInfo() {
      const Derivative = AttachDerivative(this.derivativeContract);
      const name = await Derivative.name();
      const owner = await Derivative.ownerOf(this.derivativeTokenId);
      const tokenURI = await Derivative.tokenURI(this.derivativeTokenId);
      this.derivativeDetial = {
        name,
        derivativeContract: this.derivativeContract,
        tokenId: this.derivativeTokenId,
        owner,
        tokenURI,
      };
      return this.derivativeDetial;
    }
    async orderInfo() {
      const DerivativeFactory = contracts.DerivativeFactory;
      this.orderDetail = await DerivativeFactory.orders(this.orderId).then(
        ArrayToObj
      );
      return this.orderDetail;
    }
    async licenseInfo() {
      const Licenser = contracts.Licenser;
      this.licenseDetail = await Licenser.get(this.licenseId).then(ArrayToObj);
      return this.licenseDetail;
    }
    async getAllIP() {
      const IPPool = contracts.IPPool;
      this.ipList = [];
      const ipList = await IPPool.get_items();
      for(let i = 0; i < ipList.length; i++){
        const ip = ipList[i];
        const owner = await IPPool.tokenStaker(...ip)
        this.ipList.push({...ip, owner})
      }
      return this.ipList;
    }
    async getAllOrders() {
      const DerivativeFactory = contracts.DerivativeFactory;
      this.orderList = await DerivativeFactory.get_orders().then((orders) =>
        orders.map(ArrayToObj)
      );
      console.log(this.orderList[0])
      return this.orderList;
    }
    async getAllServices() {
      const DerivativeFactory = contracts.DerivativeFactory;
      this.servicesList = await DerivativeFactory.list_service().then(
        (services) => services.map(ArrayToObj)
      );
      return this.servicesList;
    }
}
const dapp = new Dapp();

window.dapp = dapp;
export default dapp;