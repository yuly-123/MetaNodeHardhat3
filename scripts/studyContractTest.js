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
