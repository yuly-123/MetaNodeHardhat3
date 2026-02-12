import { ethers } from "ethers";
import 'dotenv/config';
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)

const main = async () => {
    // 创建合约实例
    const abi = [
        "function donate() public payable",
        "function withdraw() public",
        "function getDonation(address donor) public view returns(uint256)",
    ];
    const addressBeggingContract = '0xc53A25c9982cE790A1Ea306fdE545C22b8276C36';    // 合约地址
    const beggingContract = new ethers.Contract(addressBeggingContract, abi, providerSepoliaL);

    // 查询合约余额
    const balance = await providerSepoliaL.getBalance(addressBeggingContract);
    console.log(`Contract Balance: ${ethers.formatEther(balance)} ETH`);

    // 调用合约的只读方法
    const donation = await beggingContract.getDonation("0x6b8c612f683d63bd358cfcb72643a6959d917594");
    console.log(`Donation: ${ethers.formatEther(donation)} ETH`);

    
}
main()
