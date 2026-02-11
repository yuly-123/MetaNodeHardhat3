import { ethers } from "ethers";
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)
const main = async () => {
    // const balanceMainnetL = await providerMainnetL.getBalance(`vitalik.eth`);
    const balanceSepoliaL = await providerSepoliaL.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`);
    // console.log(`Balance Mainnet: ${ethers.formatEther(balanceMainnetL)} ETH`);
    console.log(`Balance Sepolia: ${ethers.formatEther(balanceSepoliaL)} ETH`);
}
main()
