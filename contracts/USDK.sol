// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDK is ERC20, Ownable(msg.sender) {
    address public feeAddress;
    uint256 public feePercentage;

    constructor(address _feeAddress, uint256 _feePercentage) ERC20("Kredete USD", "USDK") {
        _mint(msg.sender, 1_000_000_000 * (10 ** uint256(decimals())));
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {}
}