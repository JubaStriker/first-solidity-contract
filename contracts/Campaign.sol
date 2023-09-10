// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(
            msg.sender == manager,
            "Only the manager can call this function"
        );
        _;
    }

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "Minimum contribution not met"
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public restricted {
        // Request memory newRequest = Request({
        //     description: _description,
        //     value: _value,
        //     recipient: _recipient,
        //     complete: false,
        //     approvalsCount: 0
        // });

        // requests.push(newRequest);
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = payable(_recipient);
        newRequest.complete = false;
        newRequest.approvalsCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender], "You must be an approver to vote.");
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalsCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
