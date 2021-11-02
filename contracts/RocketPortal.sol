// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RocketPortal {
    uint256 totalLiftOff;

    /*
     * Event for each Rocket Launch
     */
    event NewRocketLaunch(address indexed from, uint256 timestamp, string message);

    /*
     * A struct is basically a custom datatype where
     * we can customize what we want to hold inside it.
     */
    struct RocketLaunch {
        address user;      // The address of the user who waved.
        string message;    // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    /*
     * Variable to store an array of structs.
     */
    RocketLaunch[] rocketLaunches;

    constructor() {
        console.log("Houston we are good for launch in 3.. 2.. 1!");
    }

    /*
     * A rocket launch function
     * @param _message The city from which the launch took place.
     */
    function rocketLaunch(string memory _message) public {
        totalLiftOff += 1;
        console.log("%s has lift off from %s!", msg.sender, _message);

        rocketLaunches.push(
            RocketLaunch(msg.sender, _message, block.timestamp)
        );

        emit NewRocketLaunch(msg.sender, block.timestamp, _message);
    }

    function getAllLaunches() public view returns (RocketLaunch[] memory) {
        return rocketLaunches;
    }

    function getTotalLaunches() public view returns (uint256) {
        console.log("We have had %d total lift offs! ", totalLiftOff);
        return totalLiftOff;
    }
}
