import { ethers } from "ethers";
const ALCHEMY_MAINNET_URL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ethers.eth: ${ethers.formatEther(balance)} ETH`);
}
main();
