const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

// ** Interface and bytecode in replaced with abi and evm.bytecode.object respectively. **

const provider = new HDWalletProvider(
    'jealous pudding spread north blue sail dumb patient blanket around grain ginger',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/e96bc6414fe94ccc9cdfe320af17137b'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

if (abi && evm) {

    const deploy = async () => {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);

        const result = await new web3.eth.Contract(abi) //await new web3.eth.Contract(interface)
            .deploy({ data: evm.bytecode.object })      // {data: bytecode}
            .send({ gas: '1000000', from: accounts[0] });

        console.log('Contract deployed to', result.options.address);
        provider.engine.stop();
    };
    deploy();
}
else {
    console.log("ABI & EVM NOT FOUND")
}
