import { ethers } from "ethers";
import ERC20_ABI from "../constants/ABIs/erc20.json";
import {coins} from '../constants/coins'

// get the token balance of an address
export async function getTokenBalance(tokenAddress, signer) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.balanceOf(signer.provider.account);
}

// get the token allowance
export async function getTokenAllowance(tokenAddress, proxyAddress, signer) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.allowance(signer.provider.account, proxyAddress);
}

export function getCorrectImageLink() {
  const table1 = {};
  const table2 = {};
  coins[3].forEach(coin => {
    table1[coin["symbol"]] = coin;
  });
  coins[1].forEach(coin => {
    table2[coin["symbol"]] = coin["logo"];
  });

  const table3 = {};
  for (let key in table1) {
    for (let key2 in table2) {
      if (key === key2) {
        table1[key]["logo"] = table2[key2];
        table3[table1[key]["address"]] = table1[key];
      }
    }
  }
  return table3;
}

export function encodeFunction() {
  let num1 = 1;
  let num2 = 2;
  let byt = ethers.utils.defaultAbiCoder.encode(
    [
        'uint256', 'uint256'
    ],
    [
        num1, num2
    ]
  );


}
