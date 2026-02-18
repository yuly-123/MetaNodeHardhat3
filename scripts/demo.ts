import { network } from "hardhat";

const { ethers } = await network.connect();

async function main() {
  
  const [signer] = await ethers.getSigners();
  const provider = ethers.provider;
  
  // 1. 读取区块链数据
  console.log('1. 读取区块链数据...');
  const blockNumber = await provider.getBlockNumber();
  console.log('当前区块号:', blockNumber);
  
  const balance = await provider.getBalance(signer.address);
  console.log('账户余额:', ethers.formatEther(balance), 'ETH');
  
  const networkInfo = await provider.getNetwork();
  console.log('网络:', networkInfo.name, 'Chain ID:', networkInfo.chainId.toString());
  console.log('');
  
  // 2. 部署合约
  console.log('2. 部署合约...');
  const contract = await ethers.deployContract("CounterDemo");
  await contract.waitForDeployment();
  const CONTRACT_ADDRESS = await contract.getAddress();
  const deploymentBlockNumber = await provider.getBlockNumber();
  console.log('合约已部署到:', CONTRACT_ADDRESS);
  console.log('部署区块号:', deploymentBlockNumber);
  console.log('');
  
  // 3. 读取初始值
  console.log('3. 读取初始值...');
  const currentNumber = await contract.getNumber();
  console.log('当前number值:', currentNumber.toString());
  console.log('');
  
  // 4. 监听事件
  console.log('4. 设置事件监听...');
  contract.on(contract.filters.Incremented(), (user, newValue, event) => {
    console.log('Incremented事件: 用户', user, '新值', newValue.toString());
  });
  console.log('事件监听已设置\n');
  
  // 5. 发送交易
  console.log('5. 发送交易...');
  console.log('调用increment()...');
  const tx1 = await contract.increment();
  console.log('交易哈希:', tx1.hash);
  const receipt1 = await tx1.wait();
  if (receipt1) {
    console.log('交易确认，区块号:', receipt1.blockNumber);
    console.log('Gas使用:', receipt1.gasUsed.toString());
  }
  
  const numberAfterIncrement = await contract.getNumber();
  console.log('increment后的number值:', numberAfterIncrement.toString());
  console.log('');
  
  // 6. 调用setNumber
  console.log('6. 调用setNumber(100)...');
  const tx2 = await contract.setNumber(100);
  const receipt2 = await tx2.wait();
  if (receipt2) {
    console.log('交易确认，区块号:', receipt2.blockNumber);
  }
  
  const numberAfterSet = await contract.getNumber();
  console.log('setNumber后的number值:', numberAfterSet.toString());
  console.log('');
  
  // 7. 查询历史事件
  console.log('7. 查询历史事件...');
  const filter = contract.filters.Incremented();
  // 从部署区块开始查询到最新区块
  const events = await contract.queryFilter(filter, deploymentBlockNumber, "latest");
  console.log('找到', events.length, '个Incremented事件');
  events.forEach((event, index) => {
    if ('args' in event && event.args) {
      console.log(`事件 ${index + 1}:`, {
        user: event.args.user,
        newValue: event.args.newValue.toString(),
        blockNumber: event.blockNumber
      });
    }
  });
  console.log('');
  
  // 8. 签名消息
  console.log('8. 签名消息...');
  const message = 'Hello, Ethers.js!';
  const signature = await signer.signMessage(message);
  console.log('消息:', message);
  console.log('签名:', signature);
  
  const recoveredAddress = ethers.verifyMessage(message, signature);
  console.log('签名者地址:', signer.address);
  console.log('恢复的地址:', recoveredAddress);
  console.log('签名有效:', recoveredAddress.toLowerCase() === signer.address.toLowerCase());
  console.log('');
  
  // 清理
  contract.removeAllListeners();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 1. 读取区块链数据...
// 当前区块号: 0
// 账户余额: 10000.0 ETH
// 网络: default Chain ID: 31337

// 2. 部署合约...
// 合约已部署到: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// 部署区块号: 1

// 3. 读取初始值...
// 当前number值: 0

// 4. 设置事件监听...
// 事件监听已设置

// 5. 发送交易...
// 调用increment()...
// 交易哈希: 0xc320e1a2183b8782b8ec239ab1535c834caed4e93dc52d040f8603ab962a3e6e
// 交易确认，区块号: 2
// Gas使用: 45152
// increment后的number值: 1

// 6. 调用setNumber(100)...
// 交易确认，区块号: 3
// setNumber后的number值: 100

// 7. 查询历史事件...
// 找到 1 个Incremented事件
// 事件 1: {
//   user: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//   newValue: '1',
//   blockNumber: 2
// }

// 8. 签名消息...
// 消息: Hello, Ethers.js!
// 签名: 0x3d4607ff194837a94e3122f8b57691e3b36b2cc161249794f294897c8dd7826859bc140a5c146a798aa4f656a57b69d06c96308ad5db45066f1ecba25bb1cb6b1c
// 签名者地址: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 恢复的地址: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// 签名有效: true
