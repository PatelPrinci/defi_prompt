// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TestnetTransfer {
    // Function to receive ETH when sent to the contract
    receive() external payable {}

    // Transfer specified amount of ETH from contract to target address
    function transferEth(address payable _to, uint256 _amount) external {
        require(address(this).balance >= _amount, "Insufficient contract balance");
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send ETH");
    }

    // Get contract ETH balance (for info)
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
