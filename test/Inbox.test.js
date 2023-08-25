const ganache = require('ganache');
const { Web3 } = require('web3');
const assert = require('assert');

// updated ganache and web3 imports added for convenience

// contract test code will go here
const web3 = new Web3(ganache.provider());




























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