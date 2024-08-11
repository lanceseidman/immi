import Web3 from 'web3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the ABI from the JSON file
const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './MedicalRecords.json'), 'utf8'));

const rpcURL = 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/'+"key";
const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

// Ensure the Ethereum address is correct
const contractAddress = '0xe80145b62497E0bcBD727566dF645D41c254611C';
const isValidAddress = web3.utils.isAddress(contractAddress);
if (!isValidAddress) {
    throw new Error('Invalid address!');
}

// Validate the private key format (no "0x" prefix)
let privateKey = '0xb312e27eaa4c91a10d23edd5c11cbc551094861e8189764a68a1dc6c81ac4c48';

// Trim any whitespace or hidden characters
privateKey = privateKey.trim();

// Validate the private key format, allowing an optional "0x" prefix
if (!/^(0x)?[0-9a-fA-F]{64}$/.test(privateKey)) {
    throw new Error('Invalid private key format');
}

// Add the private key to web3's account wallet
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

async function addPatient(name, age) {
    try {
        const tx = await contract.methods.addPatient(name, age).send({ from: account.address, gas: 2000000 });
        console.log('Transaction successful:', tx.transactionHash);
    } catch (err) {
        console.error('Transaction failed:', err);
        throw err;
    }
}

// Function to add a prescription for a patient
async function addPrescription(patientId, medication, doctor) {
    try {
        const tx = await contract.methods.addPrescription(patientId, medication, doctor).send({ from: account.address, gas: 2000000 });
        console.log('Transaction successful:', tx.transactionHash);
    } catch (err) {
        console.error('Transaction failed:', err);
        throw err;
    }
}

// Function to get patient information
async function getPatientInfo(patientId) {
    try {
        const patient = await contract.methods.getPatientInfo(patientId).call();
        console.log('Patient Info:', patient);
        return patient;
    } catch (err) {
        console.error('Error fetching patient info:', err);
        throw err;
    }
}

export { addPatient, getPatientInfo, addPrescription, contract };
