# Student Registry API

This project is an Express.js-based API that interacts with a smart contract deployed on a Hardhat local Ethereum network. It provides an API to register students and fetch student details based on their Ethereum address.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Hardhat**: [Installation Guide](https://hardhat.org/getting-started/)
- **Web3.js**: JavaScript library for interacting with Ethereum.

## Setup

1. Clone this repository to your local machine.
   Clone repository:

```bash
git clone https://github.com/your-repo/student-registry-backend.git
cd student-registry-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up Hardhat Node:

```bash
npx hardhat node
```

This will start a local Ethereum network at `http://127.0.0.1:8545`.

4. Deploy the smart contract to the Hardhat network.

```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. After deploying, note down the contract address that is printed in the console. This address will be used to interact with the smart contract.

## Configuration

Update `index.js` with the correct contract ABI and address:

- **contract-address.json**: Contains the deployed contract address.
- **StudentRegistryABI.json**: Contains the ABI of the deployed contract.

## API Endpoints

### 1. `POST /register`

- Registers a new student by providing their name and age.
- Request body:
  ```json
  {
    "name": "John Doe",
    "age": 25
  }
  ```

### 2. `GET /student/:address`

- Fetches the student details based on their Ethereum address.
- Example Request:
  ```bash
  GET http://localhost:3000/student/0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```

## Running the Server

To run the server, use the following command:

```bash
node index.js
```

The server will start at `http://localhost:3000`.
