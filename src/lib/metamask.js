
import networks from "./networks.json";

// do not call this in init script, because in that time, the metamask may not have injected ethereum object into enviroment
export async function connect(that) {
    if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
    ) {

        console.log("MetaMask is installed!");
        // console.log('that -- ==', that);

        const [accounts, chainId] = await Promise.all([
            window.ethereum.request({
                method: "eth_requestAccounts",
            }),
            window.ethereum.request({ method: "eth_chainId" }),
        ]);
        // console.log('accounts -ethereum.js', accounts);
        // console.log('chainId -ethereum.js', chainId);
        that && that.set_chainID(chainId, true);
        that && that.set_address(accounts[0], true);
        subscribe(that);
        return {chainId, accounts}
    } else {
        console.log("Please install MetaMask!");
    }
}

export async function subscribe(that) {

    // console.log('that -- ==', that);

    window.ethereum.on("connect", (connectInfo) => {
        console.log('connectInfo', connectInfo);
    });

    window.ethereum.on("accountsChanged", (accounts) => { // 订阅监听地址变更
        console.log('accounts changed:', accounts);
        that && that.set_address(accounts[0]);
    });

    //** MetaMask 锁定时，accounts changed [] */

    window.ethereum.on("chainChanged", (chainId) => { // 订阅监听公链变更
        console.log('chainId changed -ethereum.js', chainId);
        that && that.set_chainID(chainId);
    });

    window.ethereum.on('message', (message) => {
        console.log('message', message);
    });

    window.ethereum.on('disconnect', function (error) {
        console.error(error);
    });

}

export async function getBalance(that, address) {

    // console.log('that -- ==', that);

    const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, "latest"],
    })
    console.log('balance -ethereum.js', balance);
    that.set_balance(balance)
}

export function selectedAddress(){
    return window.ethereum.selectedAddress;
}

export function switchChain(name) {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            networks[name]
        ]
    });
}