// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; //-----Solidity version

contract SimpleStorage {
    uint256 public favouriteNumber;
    // People public person = People({favouriteNumber: 2, name: "Jubair"});

    People[] public people;

    // struct is like delcaring a type
    struct People {
        uint256 favouriteNumber;
        string name;
    }

    // function store(uint256 _favouriteNumber) public {
    //     favouriteNumber = _favouriteNumber;
    // }

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        // People memory newPerosn = People(_favouriteNumber, _name);
        people.push(People(_favouriteNumber, _name));
    }
}
