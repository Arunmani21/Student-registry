// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StudentRegistryModule = buildModule("StudentRegistryModule", (m) => {
  const studentRegistry = m.contract("StudentRegistry");
  return { studentRegistry };
});

export default StudentRegistryModule;
