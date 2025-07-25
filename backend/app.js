const fs = require("fs");
const { Web3 } = require("web3");
const express = require("express");
const app = express();
app.use(express.json());

// Load contract ABI
const contractABI = JSON.parse(
  fs.readFileSync("./StudentRegistryABI.json", "utf-8")
);

// Load contract address
const { address: contractAddress } = JSON.parse(
  fs.readFileSync("./contract-address.json", "utf-8")
);

// Initialize Web3 provider
const web3 = new Web3("http://127.0.0.1:8545");
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Ethereum address validation
function isValidEthAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

// Register student endpoint
app.post("/register", async (req, res) => {
  const { name, age } = req.body;

  // Input validation
  if (!name || typeof age !== "number" || age <= 0) {
    return res.status(400).json({ error: "Invalid name or age" });
  }

  try {
    const [account] = await web3.eth.getAccounts();
    if (!account) {
      return res.status(500).json({ error: "No accounts available" });
    }

    const receipt = await contract.methods.registerStudent(name, age).send({
      from: account,
      gas: 300000,
    });

    res.json({
      success: true,
      txHash: receipt.transactionHash,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Get student details endpoint
app.get("/student/:address", async (req, res) => {
  const studentAddress = req.params.address;

  if (!isValidEthAddress(studentAddress)) {
    return res.status(400).json({ error: "Invalid Ethereum address" });
  }

  try {
    const { name, age } = await contract.methods
      .students(studentAddress)
      .call();

    if (!name && age === "0") {
      return res.status(404).json({ error: "Student not registered" });
    }

    res.json({ name, age: Number(age) });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Failed to retrieve student data" });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
