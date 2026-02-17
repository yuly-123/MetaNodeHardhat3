import { ethers } from "ethers";
import 'dotenv/config';
const Ethereum_MainnetL = 'https://mainnet.infura.io/v3/b526f584bc35450aa15514a783816180';
const Ethereum_SepoliaL = 'https://sepolia.infura.io/v3/b526f584bc35450aa15514a783816180';
const providerMainnetL = new ethers.JsonRpcProvider(Ethereum_MainnetL)
const providerSepoliaL = new ethers.JsonRpcProvider(Ethereum_SepoliaL)

const main = async () => {
    // 创建合约实例
    const abi = [
        "event DonateEvent(address indexed donor, uint256 amount)",
        "event WithdrawEvent(address indexed payee, uint256 amount)",
        "function donate() public payable",
        "function withdraw() public",
        "function getDonation(address donor) public view returns(uint256)",
    ];
    const addressBeggingContract = '0xc53A25c9982cE790A1Ea306fdE545C22b8276C36';    // 合约地址
    const beggingContract = new ethers.Contract(addressBeggingContract, abi, providerSepoliaL);

    // 得到当前区块
    const block = await providerSepoliaL.getBlockNumber();
    console.log(`当前区块高度: ${block}`);

    // 查询最近100000个区块内的DonateEvent事件
    const donateEvents = await beggingContract.queryFilter('DonateEvent', block - 100000, block);
    console.log(`打印事件详情:`);
    console.log(donateEvents[0]);

    // 解析DonateEvent事件的数据（变量在args中）
    const amountDonateEvent = ethers.formatEther(donateEvents[0].args["amount"]);
    // const amountDonateEvent = ethers.formatUnits(ethers.getBigInt(donateEvents[0].args["amount"]), "ether");
    const donorDonateEvent = donateEvents[0].args["donor"];
    console.log("解析事件：");
    console.log(`地址 ${donorDonateEvent} 捐赠了 ${amountDonateEvent} ETH`);
}
main()

// EventLog {
//   provider: JsonRpcProvider {},
//   transactionHash: '0xe5c53f2e0c8b20f19c96375863d876b62f0742fa1b578e773f6d1a66a5f49bb4',
//   blockHash: '0x892b3bfcb73752d74a14a5d5c1638e541367883e2ed390f539d30995461ca55b',
//   blockNumber: 10244882,
//   removed: false,
//   address: '0xc53A25c9982cE790A1Ea306fdE545C22b8276C36',
//   data: '0x00000000000000000000000000000000000000000000000000038d7ea4c68000',
//   topics: [
//     '0x4a738e144fcebc2a2453dde8472c2fe125988d7508d635d71a45886efcf50006',
//     '0x0000000000000000000000006b8c612f683d63bd358cfcb72643a6959d917594'
//   ],
//   index: 156,
//   transactionIndex: 80,
//   interface: Interface {
//     fragments: [
//       [EventFragment],
//       [EventFragment],
//       [FunctionFragment],
//       [FunctionFragment],
//       [FunctionFragment]
//     ],
//     deploy: ConstructorFragment {
//       type: 'constructor',
//       inputs: [],
//       payable: false,
//       gas: null
//     },
//     fallback: null,
//     receive: false
//   },
//   fragment: EventFragment {
//     type: 'event',
//     inputs: [ [ParamType], [ParamType] ],
//     name: 'DonateEvent',
//     anonymous: false
//   },
//   args: Result(2) [
//     '0x6b8C612F683D63BD358Cfcb72643a6959d917594',
//     1000000000000000n
//   ]
// }

// 解析事件：
// 地址 0x6b8C612F683D63BD358Cfcb72643a6959d917594 捐赠了 0.001 ETH
