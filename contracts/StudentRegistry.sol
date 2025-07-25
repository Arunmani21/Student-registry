// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        string name;
        uint256 age;
    }

    mapping(address => Student) public students;

    function registerStudent(string memory _name, uint256 _age) public {
        students[msg.sender] = Student(_name, _age);
    }

    function getStudent(
        address _studentAddr
    ) public view returns (string memory, uint256) {
        Student memory student = students[_studentAddr];
        return (student.name, student.age);
    }
}
