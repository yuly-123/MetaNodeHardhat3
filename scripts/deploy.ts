import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("部署账户:", deployer.address);
  console.log("账户余额:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)));

  const counter = await ethers.deployContract("CounterDemo");
  
  await counter.waitForDeployment();
  const address = await counter.getAddress();
  
  console.log("Counter合约已部署到:", address);
  console.log("初始x值:", (await counter.number()).toString());
  
  return address;
}

main()
  .then((address) => {
    console.log("部署成功，合约地址:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 部署账户: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 账户余额: 10000.0
// Counter合约已部署到: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 初始x值: 0
// 部署成功，合约地址: 0x5FbDB2315678afecb367f032d93F642f64180aa3
