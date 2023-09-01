const ganache = require('ganache');
const { Web3 } = require('web3');
// updated imports added for convenience

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile')

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Lottery contract', () => {
    it('Deploys the contract', () => {
        assert.ok(lottery.options.address)
    })
    it('Allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.002', 'ether')
        });
        const players = await lottery.methods.getPlayers().call(
            { from: accounts[0] }
        )

        assert.equal(accounts[0], players[0])
        assert.equal(1, players.length)
    })
})