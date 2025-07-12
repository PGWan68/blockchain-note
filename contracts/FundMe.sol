// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe{

    mapping (address=>uint256) fundersToAmount;

    AggregatorV3Interface internal dataFeed;

    uint256 MINIMUM_VALUE = 1 * 10 ** 18;

    function fund() public payable {
        require(msg.value >= MINIMUM_VALUE, "Send more ETH");

        fundersToAmount[msg.sender] = msg.value;
    }


    function getChainlinkDataFeedLatestAnswer() public view returns(int){



    }

}



