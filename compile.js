// compile code will go here

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // Get the file path for the inbox file
const source = fs.readFileSync(inboxPath, 'utf8'); // Read the source file of the specific path

module.exports = solc.compile(source, 1).contracts[':Inbox'];