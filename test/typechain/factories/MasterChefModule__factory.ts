/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  MasterChefModule,
  MasterChefModuleInterface,
} from "../MasterChefModule";

const _abi = [
  {
    inputs: [],
    name: "PRECISION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
        name: "",
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
        name: "lastRewardBlock",
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

export class MasterChefModule__factory {
  static readonly abi = _abi;
  static createInterface(): MasterChefModuleInterface {
    return new utils.Interface(_abi) as MasterChefModuleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MasterChefModule {
    return new Contract(address, _abi, signerOrProvider) as MasterChefModule;
  }
}
