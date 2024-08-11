import Web3 from 'web3';
import { randomBytes } from 'crypto';

const web3 = new Web3();

// Generate a new Ethereum account
const account = web3.eth.accounts.create();

console.log('Address:', account.address);
console.log('Private Key:', account.privateKey);

const entropy = randomBytes(16).toString('hex');
const mnemonic = web3.utils.sha3(entropy);

console.log('Mnemonic (SHA3 of random entropy):', mnemonic);
