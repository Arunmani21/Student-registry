const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentRegistry Contract", function () {
  let StudentRegistry;
  let studentRegistry;
  let owner;
  let addr1;
  let addr2;

  // Deploy the contract before running each test
  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    StudentRegistry = await ethers.getContractFactory("StudentRegistry");
    studentRegistry = await StudentRegistry.deploy(); // This line returns the contract instance directly

    // No need for .deployed() here, as we are directly assigning the contract instance
  });

  // Test registration functionality
  it("should register a student successfully", async function () {
    const studentName = "John Doe";
    const studentAge = 25;

    // Register student
    await studentRegistry.registerStudent(studentName, studentAge);

    // Get student data
    const [name, age] = await studentRegistry.getStudent(owner.address);

    expect(name).to.equal(studentName);
    expect(age).to.equal(studentAge);
  });

  // Test multiple registrations with different addresses
  it("should allow multiple students to register", async function () {
    const studentName1 = "Alice";
    const studentAge1 = 22;

    const studentName2 = "Bob";
    const studentAge2 = 24;

    // Register first student
    await studentRegistry
      .connect(addr1)
      .registerStudent(studentName1, studentAge1);

    // Register second student
    await studentRegistry
      .connect(addr2)
      .registerStudent(studentName2, studentAge2);

    // Get student data
    const [name1, age1] = await studentRegistry.getStudent(addr1.address);
    const [name2, age2] = await studentRegistry.getStudent(addr2.address);

    expect(name1).to.equal(studentName1);
    expect(age1).to.equal(studentAge1);
    expect(name2).to.equal(studentName2);
    expect(age2).to.equal(studentAge2);
  });

  // Test for unregistered student
  it("should return default values for unregistered students", async function () {
    const [name, age] = await studentRegistry.getStudent(addr1.address);
    expect(name).to.equal("");
    expect(age).to.equal(0);
  });

  // Test for invalid Ethereum address
  it("should return empty values if the address is invalid or not registered", async function () {
    const invalidAddress = "0x0000000000000000000000000000000000000000";
    const [name, age] = await studentRegistry.getStudent(invalidAddress);
    expect(name).to.equal("");
    expect(age).to.equal(0);
  });
});
