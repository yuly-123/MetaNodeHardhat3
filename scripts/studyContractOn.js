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

    // 过滤监听
    console.log("3. 利用 filters 持续监听 WithdrawEvent 事件")
    let filter = contract.filters.WithdrawEvent('0x6b8C612F683D63BD358Cfcb72643a6959d917594', null);
    console.log("过滤器详情:");
    console.log(filter);
    contract.on(filter, (res) => {
        console.log('---------监听WithdrawEvent--------');
        console.log(`filters ${res.args[0]} ${ethers.formatUnits(res.args[1], 6)}`);
    });

    // 过滤来自 myAddress 地址的 Transfer 事件
    // const filter1 = contract.filters.Transfer(myAddress);
    // 过滤所有发给 myAddress 地址的 Transfer 事件
    // const filter2 = contract.filters.Transfer(null, myAddress);
    // 过滤所有从 myAddress 发给 otherAddress的 Transfer 事件
    // const filter3 = contract.filters.Transfer(myAddress, otherAddress);
    // 过滤所有发给 myAddress 或 otherAddress 的 Transfer 事件
    // const filter4 = contract.filters.Transfer(null, [ myAddress, otherAddress ]);
}
main()

// 1. 利用 contract.once() 监听一次 WithdrawEvent 事件
// 2. 利用 contract.on() 持续监听 WithdrawEvent 事件
// 3. 利用 filters 持续监听 WithdrawEvent 事件
// 过滤器详情:
// PreparedTopicFilter {
//   fragment: EventFragment {
//     type: 'event',
//     inputs: [ [ParamType], [ParamType] ],
//     name: 'WithdrawEvent',
//     anonymous: false
//   }
// }
// once() 0x6b8C612F683D63BD358Cfcb72643a6959d917594 withdrew 0.0 ETH
// on() 0x6b8C612F683D63BD358Cfcb72643a6959d917594 withdrew 0.0 ETH
// ---------监听WithdrawEvent--------
// filters 0x6b8C612F683D63BD358Cfcb72643a6959d917594 0.0
