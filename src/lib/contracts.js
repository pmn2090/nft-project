import { ethers } from "ethers";
import Derivative from './abis/Derivative.json';
import DerivativeFactory from './abis/DerivativeFactory.json';
import IPPool from './abis/IPPool.json';
import Licenser from './abis/Licenser.json';
import MockNFT from './abis/MockNFT.json';
import addresses from './addresses.json';

window.ethers = ethers;

const AddressZero = ethers.constants.AddressZero;
const IDerivativeFactory = new ethers.Contract(AddressZero, DerivativeFactory);
const IIPPool = new ethers.Contract(AddressZero, IPPool);
const ILicenser = new ethers.Contract(AddressZero, Licenser);
const IMockNFT = new ethers.Contract(AddressZero, MockNFT);
const IDerivative = new ethers.Contract(AddressZero, Derivative);

let contracts = {}

export function InitContracts(chainId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddresses = addresses[Number(chainId)];
    console.log(currentAddresses, Number(chainId), chainId)
    contracts = {
        DerivativeFactory: IDerivativeFactory.attach(currentAddresses.DerivativeFactory).connect(signer),
        IPPool: IIPPool.attach(currentAddresses.IPPool).connect(signer),
        Licenser: ILicenser.attach(currentAddresses.Licenser).connect(signer),
        MockNFT: IMockNFT.attach(currentAddresses.MockNFT).connect(signer)
    };
    window.contracts = contracts;
    return contracts;
}

export function AttachDerivative(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return IDerivative.attach(address).connect(signer);
}

