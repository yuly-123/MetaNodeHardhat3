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
        "function donate() public payable",
        "function withdraw() public",
        "function getDonation(address donor) public view returns(uint256)",
    ];
    const addressBeggingContract = '0xc53A25c9982cE790A1Ea306fdE545C22b8276C36';    // 合约地址
    const beggingContract = new ethers.Contract(addressBeggingContract, abi, account1);
    // 也可以声明一个只读合约，再用connect(account1)函数转换成可写合约。
    // const beggingContract = new ethers.Contract(addressBeggingContract, abi, providerSepoliaL);
    // beggingContract.connect(account1)

    // 第 1 次查账

    // 获取钱包余额
    let account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    let contractBalance = await providerSepoliaL.getBalance(addressBeggingContract);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);

    // 获取钱包账户捐献金额，调用合约的getDonation函数
    let account1BalanceContract = await beggingContract.getDonation(account1Address);
    console.log(`Contract Balance for Account1: ${ethers.formatEther(account1BalanceContract)} ETH`);

    // 向合约捐献ETH，调用合约的donate函数
    console.log(`Donating 0.001 ETH to the contract from Account1...`);
    const donateTx = await beggingContract.donate({ value: ethers.parseEther("0.001") });
    await donateTx.wait();
    console.log("Donation transaction receipt:\n", donateTx);

    // 第 2 次查账

    // 获取钱包余额
    account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    contractBalance = await providerSepoliaL.getBalance(addressBeggingContract);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);

    // 获取钱包账户捐献金额，调用合约的getDonation函数
    account1BalanceContract = await beggingContract.getDonation(account1Address);
    console.log(`Contract Balance for Account1: ${ethers.formatEther(account1BalanceContract)} ETH`);

    // 从合约提取ETH，调用合约的withdraw函数
    console.log(`Withdrawing donated ETH from the contract to Account1...`);
    const withdrawTx = await beggingContract.withdraw();
    await withdrawTx.wait();
    console.log("Withdraw transaction receipt:\n", withdrawTx);

    // 第 3 次查账

    // 获取钱包余额
    account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    contractBalance = await providerSepoliaL.getBalance(addressBeggingContract);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);
}
main()
