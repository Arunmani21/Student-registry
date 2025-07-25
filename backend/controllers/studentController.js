const { web3, contract } = require("../services/web3Service");
const {
  isValidEthAddress,
  validateStudentData,
} = require("../utils/validation");

const registerStudent = async (req, res) => {
  const { name, age } = req.body;

  // Validate input
  const validationError = validateStudentData(name, age);
  if (validationError) {
    return res.status(400).json({ error: validationError });
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
};

const getStudent = async (req, res) => {
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
};

module.exports = {
  registerStudent,
  getStudent,
};
