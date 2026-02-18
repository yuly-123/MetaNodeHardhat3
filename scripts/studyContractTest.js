import { ethers } from "ethers";
import 'dotenv/config';
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)

const main = async () => {
    // 创建钱包实例
    const account1 = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, providerSepoliaL);

    // 获取钱包地址
    const account1Address = await account1.getAddress();
    console.log(`Account1 Address: ${account1Address}`);

    // 创建合约实例
    const abi = [
        "function withdraw() public",
    ];
    const addressBeggingContract = '0xeF22976E24B7de69C9A979a7944dc72CF14BE089';    // 合约地址
    const beggingContract = new ethers.Contract(addressBeggingContract, abi, account1);

    // 从合约提取ETH，调用合约的withdraw函数
    console.log(`Withdrawing donated ETH from the contract to Account1...`);
    const withdrawTx = await beggingContract.withdraw();
    await withdrawTx.wait();
    console.log("Withdraw transaction receipt:\n", withdrawTx);
}
main()

// Account1 Address: 0x6b8C612F683D63BD358Cfcb72643a6959d917594
// Withdrawing donated ETH from the contract to Account1...
// Withdraw transaction receipt:
//  ContractTransactionResponse {
//   provider: JsonRpcProvider {},
//   blockNumber: null,
//   blockHash: null,
//   index: undefined,
//   hash: '0xfd691384a23b5c3d00903716e1187a05dbe2b104daebf9ad7631df3c3a9a0717',
//   type: 2,
//   to: '0xeF22976E24B7de69C9A979a7944dc72CF14BE089',
//   from: '0x6b8C612F683D63BD358Cfcb72643a6959d917594',
//   nonce: 30,
//   gasLimit: 25774n,
//   gasPrice: undefined,
//   maxPriorityFeePerGas: 1000000n,
//   maxFeePerGas: 8130741362n,
//   maxFeePerBlobGas: null,
//   data: '0x3ccfd60b',
//   value: 0n,
//   chainId: 11155111n,
//   signature: Signature { r: 0x96cf201fb1bb1029832439d48883bb92583d4ad08ca2a6b3a9a47b57534c3bc9, s: 0x4d1badd978b04558802c191312ae923689f97f90ee78bb0cb80f023ded80fb3b, v: 27 },
//   accessList: [],
//   blobVersionedHashes: null,
//   authorizationList: null
// }
