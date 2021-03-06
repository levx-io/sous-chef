/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IMasterChefModule,
  IMasterChefModuleInterface,
} from "../IMasterChefModule";

const _abi = [
  {
    inputs: [],
    name: "masterChef",
    outputs: [
      {
        internalType: "contract IMasterChef",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
    ],
    name: "rewardPoolInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "accSushiPerShare",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sushiLastRewardBlock",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sushi",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IMasterChefModule__factory {
  static readonly abi = _abi;
  static createInterface(): IMasterChefModuleInterface {
    return new utils.Interface(_abi) as IMasterChefModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMasterChefModule {
    return new Contract(address, _abi, signerOrProvider) as IMasterChefModule;
  }
}
