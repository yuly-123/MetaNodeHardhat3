import { ethers } from "ethers";
import 'dotenv/config';
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)

const main = async () => {
    const contractAddress = '0xeF22976E24B7de69C9A979a7944dc72CF14BE089';   // 合约地址
    const abi = [
        "event WithdrawEvent(address indexed payee, uint256 amount)",
    ];
    const contract = new ethers.Contract(contractAddress, abi, providerSepoliaL);

    // 监听一次
    console.log("1. 利用 contract.once() 监听一次 WithdrawEvent 事件");
    contract.once('WithdrawEvent', (payee, amount) => {
        console.log(`once() ${payee} withdrew ${ethers.formatUnits(ethers.getBigInt(amount), 6)} ETH`);
    });

    // 持续监听
    console.log("2. 利用 contract.on() 持续监听 WithdrawEvent 事件");
    contract.on('WithdrawEvent', async(payee, amount) => {
        console.log(`on() ${payee} withdrew ${ethers.formatUnits(ethers.getBigInt(amount), 6)} ETH`);
    });
}
main()
