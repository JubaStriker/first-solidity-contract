// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Lottery {
    address public manager;
    address[] public players;

    function lottery() public {
        // msg is a global object that holds the address that invocated the current function in msg.sender
        manager = msg.sender;
    }

    function enter() public payable {
        players.push(msg.sender);
    }
}
