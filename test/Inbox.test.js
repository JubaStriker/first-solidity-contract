const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const { interface, bytecode } = require('../compile');

// updated ganache and web3 imports added for convenience

// contract test code will go here
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_MESSAGE = "Hi there!"

beforeEach(async () => {
    // Get the list of all accounts
    // Use one of those accounts to deploy the contract
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe("Inbox", () => {
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address)
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_MESSAGE);
    })
    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye now').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Bye now')
    })
})


























// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car class testing', () => {
//     it('park should return a string', () => {
//         assert.equal(car.park(), 'stopped');
//     })

//     it('drive should return a string vroom', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// })