import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * @title Crowdfunding Deployment Module
 * @dev Hardhat Ignition module for deploying CrowdfundingFactory
 */
export default buildModule("CrowdfundingModule", (m) => {
  // Deploy CrowdfundingFactory contract
  const factory = m.contract("CrowdfundingFactory");

  return { factory };
});

// PS E:\vscode\MetaNodeHardhat3> npx hardhat ignition deploy .\ignition\modules\Crowdfunding.ts --network sepolia
// [hardhat-keystore] Enter the password: ********
// √ Confirm deploy to network sepolia (11155111)? ... yes
// Hardhat Ignition 🚀

// Resuming existing deployment from .\ignition\deployments\chain-11155111

// Deploying [ CrowdfundingModule ]

// Warning - previously executed futures are not in the module:
//  - CounterModule#Counter
//  - CounterModule#Counter.incBy

// Batch #1
//   Executed CrowdfundingModule#CrowdfundingFactory

// [ CrowdfundingModule ] successfully deployed 🚀

// Deployed Addresses

// CounterModule#Counter - 0x461dB65A05f4C260974316cEA480cB39fd13B6d0
// CrowdfundingModule#CrowdfundingFactory - 0x99f88850cEc7e2842e40eCFF2739B6A77c941E0D
