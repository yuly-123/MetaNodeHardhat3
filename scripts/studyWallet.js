import { ethers } from "ethers";
import 'dotenv/config';
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)

const main = async () => {
    // 创建钱包实例
    const account1 = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, providerSepoliaL);
    const account2 = new ethers.Wallet(process.env.ACCOUNT2_PRIVATE_KEY, providerSepoliaL);
    // console.log(`ACCOUNT1_PRIVATE_KEY: `, process.env.ACCOUNT1_PRIVATE_KEY);
    // console.log(`ACCOUNT2_PRIVATE_KEY: `, process.env.ACCOUNT2_PRIVATE_KEY);

    // 获取钱包地址
    const account1Address = await account1.getAddress();
    const account2Address = await account2.getAddress();
    console.log(`account1Address: `, account1Address);
    console.log(`account2Address: `, account2Address);

    // 获取钱包余额
    let account1Balance = await providerSepoliaL.getBalance(account1);
    let account2Balance = await providerSepoliaL.getBalance(account2);
    console.log(`account1Balance: ${ethers.formatEther(account1Balance)} ETH`);
    console.log(`account2Balance: ${ethers.formatEther(account2Balance)} ETH`);

    // 获取助记词，需使用助记词创建钱包才有
    // const account1Mnemonic = account1.mnemonic.phrase;
    // const account2Mnemonic = account2.mnemonic.phrase;
    // console.log(`account1Mnemonic: `, account1Mnemonic);
    // console.log(`account2Mnemonic: `, account2Mnemonic);

    // 获取私钥，需使用私钥创建钱包才有，此代码不能公开执行，隐私泄露风险，仅作学习演示
    // const account1PrivateKey = account1.privateKey;
    // const account2PrivateKey = account2.privateKey;
    // console.log(`account1PrivateKey: `, account1PrivateKey);
    // console.log(`account2PrivateKey: `, account2PrivateKey);

    // 获取钱包在链上的交互次数
    // const account1TxCount = await providerSepoliaL.getTransactionCount(account1);
    // const account2TxCount = await providerSepoliaL.getTransactionCount(account2);
    // console.log(`account1TxCount: `, account1TxCount);
    // console.log(`account2TxCount: `, account2TxCount);

    // 发送ETH
    console.log(`Sending 0.001 ETH from account1 to account2...`);
    const tx = { to: account2Address, value: ethers.parseEther("0.001") };  // 构造交易请求，参数：to为接收地址，value为ETH数额
    const receipt = await account1.sendTransaction(tx);                     // 发送交易，获得收据
    await receipt.wait();                                                   // 等待链上确认交易
    console.log("receipt:\n", receipt);                                     // 打印收据交易详情

    // 获取钱包余额
    account1Balance = await providerSepoliaL.getBalance(account1);
    account2Balance = await providerSepoliaL.getBalance(account2);
    console.log(`account1Balance: ${ethers.formatEther(account1Balance)} ETH`);
    console.log(`account2Balance: ${ethers.formatEther(account2Balance)} ETH`);

}
main()
// Example output:
// account1Address:  0x6b8C612F683D63BD358Cfcb72643a6959d917594
// account2Address:  0xa9A633e66eE187f95a741fFdC5402bbc53E72376
// account1Balance: 1.994002803441613472 ETH
// account2Balance: 0.001 ETH
// Sending 0.001 ETH from account1 to account2...
// receipt:
//  TransactionResponse {
//   provider: JsonRpcProvider {},
//   blockNumber: null,
//   blockHash: null,
//   index: undefined,
//   hash: '0x7b0856288709abdd4b32ce6cd3f87621a6906ae3625303058b3987d62adb4ba3',
//   type: 2,
//   to: '0xa9A633e66eE187f95a741fFdC5402bbc53E72376',
//   from: '0x6b8C612F683D63BD358Cfcb72643a6959d917594',
//   nonce: 19,
//   gasLimit: 21000n,
//   gasPrice: undefined,
//   maxPriorityFeePerGas: 1439189n,
//   maxFeePerGas: 12854031941n,
//   maxFeePerBlobGas: null,
//   data: '0x',
//   value: 1000000000000000n,
//   chainId: 11155111n,
//   signature: Signature { r: 0x99966e8a60fd9ee9236e0a81bd5252e6aad4d411d41e9943be61e76c0c920ac9, s: 0x3a0943d4a7921c322fe7a85f92a048b42a467604b26a19e586eb2b2ca205aa28, v: 27 },
//   accessList: [],
//   blobVersionedHashes: null,
//   authorizationList: null
// }
// account1Balance: 1.992870489569811472 ETH
// account2Balance: 0.002 ETH
