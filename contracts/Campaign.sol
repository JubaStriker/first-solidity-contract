// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }
    Request[] public requests;
    address public manager;
    uint256 minimumContribution;
    address[] approvers;

    modifier restricted() {
        msg.sender == manager;
        _;
    }

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value > minimumContribution,
            "Minimum contribution not met"
        );
        approvers.push(msg.sender);
    }

    function createRequest() public restricted {}
}
