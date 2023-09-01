const path = require('path');
const fs = require('fs');
const solc = require('solc');

// const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// const source = fs.readFileSync(inboxPath, 'utf8');

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");


const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lotter);

// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//     'Inbox.sol'
// ].Inbox;
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Lottery.sol'
].Lotter;


// const path = require("path");
// const fs = require("fs");
// const solc = require("solc");

// const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
// const source = fs.readFileSync(lotteryPath, "utf8");

// module.exports = solc.compile(source, 1).contracts[":Lotter"];
