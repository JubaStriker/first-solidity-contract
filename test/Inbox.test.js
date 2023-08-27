const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');
const { interface, bytecode } = require('../compile');

// updated ganache and web3 imports added for convenience

// contract test code will go here
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    // Get the list of all accounts
    // Use one of those accounts to deploy the contract
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there'] })
        .send({ from: accounts[0], gas: '1000000' })
})

describe("Inbox", () => {
    it('Deploys a contract', () => {
        console.log(inbox)
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