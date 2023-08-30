// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lotter {
    address public manager;
    address payable[] public players;

    function Lottery() public {
        // msg is a global object that holds the address that invocated the current function in msg.sender
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.001 ether);
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, players)
                )
            );
        // Difficulty is replaced by prevrandao
    }

    function pickWinner() public {
        uint index = random() % players.length;
        //players[index] will be a type of address that is like objects that can have methods

        players[index].transfer(address(this).balance);
    }
}
