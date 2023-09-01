const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
//updated web3 and hdwallet-provider imports added for convenience
const { interface, bytecode } = require('./compile');

// deploy code will go here

const provider = new HDWalletProvider('jealous pudding spread north blue sail dumb patient blanket around grain ginger', 'https://sepolia.infura.io/v3/e96bc6414fe94ccc9cdfe320af17137b');

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Attempting to deploy from account " + accounts[0])

        const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode, arguments: ['Hi there'] })
            .send({ from: accounts[0], gas: '1000000' })

        console.log("Contract deployed to", result.options.address)

        provider.engine.stop(); // To prevent a hanging development;
    }
    catch (error) {
        console.log(error);
    }
}

deploy();