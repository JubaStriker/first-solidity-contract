const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require("assert");
// updated imports added for convenience

const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi) //await new web3.eth.Contract(interface)
        .deploy({ data: evm.bytecode.object })      // {data: bytecode}
        .send({ gas: '1000000', from: accounts[0] });
})

describe('Lottery contract', () => {
    it('Deploys the contract', () => {
        assert.ok(lottery.options.address)
    })

    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.002", "ether"),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('Allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.002', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.002', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.002', 'ether')
        });
        const players = await lottery.methods.getPlayers().call(
            { from: accounts[0] }
        )

        assert.equal(accounts[0], players[0])
        assert.equal(accounts[1], players[1])
        assert.equal(accounts[2], players[2])
        assert.equal(3, players.length)
    });
    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            })
            assert(false)
        }
        catch (err) {
            assert.ok(err)
        }
    })
})
