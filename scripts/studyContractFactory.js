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

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "DonateEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "payee",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "WithdrawEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "donate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                }
            ],
            "name": "getDonation",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const bytecode = "608060405234801561000f575f5ffd5b50335f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610081575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016100789190610196565b60405180910390fd5b6100908161009660201b60201c565b506101af565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61018082610157565b9050919050565b61019081610176565b82525050565b5f6020820190506101a95f830184610187565b92915050565b6107f3806101bc5f395ff3fe608060405260043610610054575f3560e01c80633ccfd60b14610058578063410a1d321461006e578063715018a6146100aa5780638da5cb5b146100c0578063ed88c68e146100ea578063f2fde38b146100f4575b5f5ffd5b348015610063575f5ffd5b5061006c61011c565b005b348015610079575f5ffd5b50610094600480360381019061008f91906105b8565b610222565b6040516100a191906105fb565b60405180910390f35b3480156100b5575f5ffd5b506100be610268565b005b3480156100cb575f5ffd5b506100d461027b565b6040516100e19190610623565b60405180910390f35b6100f26102a2565b005b3480156100ff575f5ffd5b5061011a600480360381019061011591906105b8565b610387565b005b61012461040b565b5f4790505f3373ffffffffffffffffffffffffffffffffffffffff168260405161014d90610669565b5f6040518083038185875af1925050503d805f8114610187576040519150601f19603f3d011682016040523d82523d5f602084013e61018c565b606091505b50509050806101d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101c7906106d7565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f5dba113b49cfa7c90315e8e604e6b506f7abcb909b01dcb19ec39005086e68fc8360405161021691906105fb565b60405180910390a25050565b5f60015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b61027061040b565b6102795f610492565b565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b5f34116102e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102db9061073f565b60405180910390fd5b3460015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f828254610330919061078a565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f4a738e144fcebc2a2453dde8472c2fe125988d7508d635d71a45886efcf500063460405161037d91906105fb565b60405180910390a2565b61038f61040b565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036103ff575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016103f69190610623565b60405180910390fd5b61040881610492565b50565b610413610553565b73ffffffffffffffffffffffffffffffffffffffff1661043161027b565b73ffffffffffffffffffffffffffffffffffffffff161461049057610454610553565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016104879190610623565b60405180910390fd5b565b5f5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050815f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f33905090565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6105878261055e565b9050919050565b6105978161057d565b81146105a1575f5ffd5b50565b5f813590506105b28161058e565b92915050565b5f602082840312156105cd576105cc61055a565b5b5f6105da848285016105a4565b91505092915050565b5f819050919050565b6105f5816105e3565b82525050565b5f60208201905061060e5f8301846105ec565b92915050565b61061d8161057d565b82525050565b5f6020820190506106365f830184610614565b92915050565b5f81905092915050565b50565b5f6106545f8361063c565b915061065f82610646565b5f82019050919050565b5f61067382610649565b9150819050919050565b5f82825260208201905092915050565b7f63616c6c206661696c65640000000000000000000000000000000000000000005f82015250565b5f6106c1600b8361067d565b91506106cc8261068d565b602082019050919050565b5f6020820190508181035f8301526106ee816106b5565b9050919050565b7f696e76616c696420616d6f756e740000000000000000000000000000000000005f82015250565b5f610729600e8361067d565b9150610734826106f5565b602082019050919050565b5f6020820190508181035f8301526107568161071d565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610794826105e3565b915061079f836105e3565b92508282019050808211156107b7576107b661075d565b5b9291505056fea2646970667358221220238b9aa14200fa9ba73b3952f0a9a794a29f49d53b2839f6adcac53cf41c27e864736f6c634300081e0033";

    // 通过合约工厂部署合约
    const contractFactory = new ethers.ContractFactory(abi, bytecode, account1);
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();

    // 获取合约地址
    const contractAddress = await contract.getAddress();
    console.log(`合约地址: ${contractAddress}`);
    console.log(`部署合约的交易详情: ${contract.deploymentTransaction()}`);

    // 第 1 次查账

    // 获取钱包余额
    let account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    let contractBalance = await providerSepoliaL.getBalance(contractAddress);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);

    // 获取钱包账户捐献金额，调用合约的getDonation函数
    let account1BalanceContract = await contract.getDonation(account1Address);
    console.log(`Contract Balance for Account1: ${ethers.formatEther(account1BalanceContract)} ETH`);

    // 向合约捐献ETH，调用合约的donate函数
    console.log(`Donating 0.001 ETH to the contract from Account1...`);
    const donateTx = await contract.donate({ value: ethers.parseEther("0.001") });
    await donateTx.wait();
    console.log("Donation transaction receipt:\n", donateTx);

    // 第 2 次查账

    // 获取钱包余额
    account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    contractBalance = await providerSepoliaL.getBalance(contractAddress);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);

    // 获取钱包账户捐献金额，调用合约的getDonation函数
    account1BalanceContract = await contract.getDonation(account1Address);
    console.log(`Contract Balance for Account1: ${ethers.formatEther(account1BalanceContract)} ETH`);

    // 从合约提取ETH，调用合约的withdraw函数
    console.log(`Withdrawing donated ETH from the contract to Account1...`);
    const withdrawTx = await contract.withdraw();
    await withdrawTx.wait();
    console.log("Withdraw transaction receipt:\n", withdrawTx);

    // 第 3 次查账

    // 获取钱包余额
    account1Balance = await providerSepoliaL.getBalance(account1);
    console.log(`Account1 Balance: ${ethers.formatEther(account1Balance)} ETH`);

    // 获取合约余额
    contractBalance = await providerSepoliaL.getBalance(contractAddress);
    console.log(`Contract Balance: ${ethers.formatEther(contractBalance)} ETH`);
}
main()
