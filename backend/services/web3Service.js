const { Web3 } = require("web3");
const fs = require("fs");

// Initialize Web3 provider
const web3 = new Web3("http://127.0.0.1:8545");

// Load contract ABI and address
const contractABI = JSON.parse(
  fs.readFileSync("./StudentRegistryABI.json", "utf-8")
);
const { address: contractAddress } = JSON.parse(
  fs.readFileSync("./contract-address.json", "utf-8")
);

// Create contract instance
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

module.exports = {
  web3,
  contract,
};
