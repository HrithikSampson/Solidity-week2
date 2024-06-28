
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract User {
    string private fid;
    Transaction[] public txns;
    mapping()
}
contract Product is Ownable {
    uint256 private pid;
    string public description;
    string public img_url;
    string public title;
    string public category;
    address public walletAddress;
    address public tokenAddress;
    constructor(address owner) public Ownable(owner) {

    }

}
contract Transaction is Ownable {
    address public tokenAddress;
    uint256 public amountInUSD;
    Product public product;
    constructor(address owner) public Ownable(owner) {}


}
contract Dashboard {
    mapping(string => User) public users;
}
