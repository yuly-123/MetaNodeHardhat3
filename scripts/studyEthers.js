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

    // 查询provider连接到了哪条链
    const network = await providerSepoliaL.getNetwork();
    console.log(`network: `, network.toJSON());

    // 查询当前区块高度
    const blockNumber = await providerSepoliaL.getBlockNumber();
    console.log(`blockNumber: `, blockNumber);

    // 查询某个钱包的历史交易次数
    const txCount = await providerSepoliaL.getTransactionCount("vitalik.eth");
    console.log(`txCount: `, txCount);

    // 查询当前建议的gas设置
    const feeData = await providerSepoliaL.getFeeData();
    console.log(`feeData: `, feeData);

    // 查询区块信息，参数为要查询的区块高度
    const block = await providerSepoliaL.getBlock(0);
    console.log(`block: `, block);

    // 查询某个地址的合约bytecode，参数为合约地址
    const code = await providerSepoliaL.getCode("0xc53A25c9982cE790A1Ea306fdE545C22b8276C36");
    console.log(`code: `, code);
}
main()
