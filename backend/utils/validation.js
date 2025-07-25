function isValidEthAddress(address) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

function validateStudentData(name, age) {
  if (!name || typeof age !== "number" || age <= 0) {
    return "Invalid name or age";
  }
  return null;
}

module.exports = {
  isValidEthAddress,
  validateStudentData,
};
