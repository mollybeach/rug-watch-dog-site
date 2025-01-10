// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RugWatchDog is Ownable, ReentrancyGuard {
    struct TokenMetrics {
        uint256 liquidityScore;      // 0-100
        uint256 holderDistribution;  // Gini coefficient (0-100)
        uint256 tradingVolume;       // In wei
        uint256 lastUpdated;         // Timestamp
        bool isLocked;               // Liquidity lock status
        address tokenAddress;        // Token contract address
    }

    mapping(address => TokenMetrics) public tokenRegistry;
    mapping(address => bool) public verifiedTokens;
    
    event TokenRegistered(address indexed tokenAddress, uint256 liquidityScore);
    event RiskAlert(address indexed tokenAddress, string riskType, uint256 severity);
    event TokenVerified(address indexed tokenAddress, bool status);

    constructor() Ownable(msg.sender) {}

    function registerToken(
        address _tokenAddress,
        uint256 _liquidityScore,
        uint256 _holderDistribution,
        bool _isLocked
    ) external onlyOwner {
        require(_tokenAddress != address(0), "Invalid token address");
        require(_liquidityScore <= 100, "Invalid liquidity score");
        require(_holderDistribution <= 100, "Invalid distribution score");

        tokenRegistry[_tokenAddress] = TokenMetrics({
            liquidityScore: _liquidityScore,
            holderDistribution: _holderDistribution,
            tradingVolume: 0,
            lastUpdated: block.timestamp,
            isLocked: _isLocked,
            tokenAddress: _tokenAddress
        });

        emit TokenRegistered(_tokenAddress, _liquidityScore);
    }

    function updateMetrics(
        address _tokenAddress,
        uint256 _liquidityScore,
        uint256 _holderDistribution,
        uint256 _tradingVolume
    ) external onlyOwner {
        require(tokenRegistry[_tokenAddress].tokenAddress != address(0), "Token not registered");
        
        TokenMetrics storage metrics = tokenRegistry[_tokenAddress];
        
        // Check for suspicious changes
        if (_liquidityScore < metrics.liquidityScore * 80 / 100) { // 20% drop
            emit RiskAlert(_tokenAddress, "LIQUIDITY_DROP", 2);
        }
        
        if (_holderDistribution > metrics.holderDistribution * 120 / 100) { // 20% concentration
            emit RiskAlert(_tokenAddress, "HOLDER_CONCENTRATION", 3);
        }

        // Update metrics
        metrics.liquidityScore = _liquidityScore;
        metrics.holderDistribution = _holderDistribution;
        metrics.tradingVolume = _tradingVolume;
        metrics.lastUpdated = block.timestamp;
    }

    function verifyToken(address _tokenAddress, bool _status) external onlyOwner {
        verifiedTokens[_tokenAddress] = _status;
        emit TokenVerified(_tokenAddress, _status);
    }

    function getRiskScore(address _tokenAddress) public view returns (uint256) {
        TokenMetrics memory metrics = tokenRegistry[_tokenAddress];
        require(metrics.tokenAddress != address(0), "Token not registered");

        // Basic risk scoring algorithm
        uint256 riskScore = 100;

        // Deduct points for low liquidity
        if (metrics.liquidityScore < 50) {
            riskScore -= (50 - metrics.liquidityScore);
        }

        // Deduct points for high holder concentration
        if (metrics.holderDistribution > 70) {
            riskScore -= (metrics.holderDistribution - 70);
        }

        // Bonus points for locked liquidity
        if (metrics.isLocked) {
            riskScore += 10;
        }

        // Cap the score at 100
        return riskScore > 100 ? 100 : riskScore;
    }

    function getTokenMetrics(address _tokenAddress) 
        external 
        view 
        returns (TokenMetrics memory) 
    {
        require(tokenRegistry[_tokenAddress].tokenAddress != address(0), "Token not registered");
        return tokenRegistry[_tokenAddress];
    }
}
