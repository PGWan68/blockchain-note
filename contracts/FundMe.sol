// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe{

    mapping (address=>uint256) public fundersToAmount;

    AggregatorV3Interface internal dataFeed;

    // 10 USD
    uint256 MINIMUM_VALUE = 1 * 10 ** 18;

    // 100w USD
    uint256 TARGET_VALUE = 10**6 * 10 ** 10;

    address public owner;

    uint256 lockTimestamp;
    uint256 deploymentTimestamp;

    constructor(uint256 _lockTime, address dataFeedAddr){
        dataFeed = AggregatorV3Interface(dataFeedAddr);
        owner = msg.sender;
        lockTimestamp = _lockTime;
        deploymentTimestamp = block.timestamp;
    }

    // 存款
    // 存入资金大于最小存入额
    // 时间要在存款周期内
    function fund() external payable {
        require(convertEthToUsd(msg.value) >= MINIMUM_VALUE, "The value too min, send more ETH");
        require(block.timestamp < deploymentTimestamp + lockTimestamp, "Fund period is closed");

        fundersToAmount[msg.sender] = msg.value;
    }


    // 取款
    // 存款资金需要大于目标资金
    function getFund() external fundPeriodClosed onlyOwner{
        require(fundersToAmount[address(this)] >= TARGET_VALUE, "Target is reached");

        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");

        require(success, "Transfer tx failed");

        fundersToAmount[msg.sender] = 0;
    }


    // 获取ETH的价格
    function getChainlinkDataFeedLatestAnswer() public view returns(int256){
        (,int256 answer,,, ) = dataFeed.latestRoundData();
        return answer;
    }

    // 存入的ETH价值多少USD
     function convertEthToUsd(uint256 ethAmount) internal view returns(uint256){
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return ethAmount * ethPrice / (10 ** 8);
    }


    // 存款周期结束
    modifier fundPeriodClosed() {
        require(block.timestamp >= deploymentTimestamp + lockTimestamp, "Fund period not closed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not onwer, no permission");
        _;
    }


}



