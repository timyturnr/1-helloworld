const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI)
const abi = [
  "function getGreet() external view returns(string)",
  "function setGreet(string calldata _greet) public"
]
const contractAddress = "0xe270C6cfaB0B43e7eA7195282C52F08AbD3fAF87";
const contract = new ethers.Contract(contractAddress, abi, provider)

const wallet = new ethers.Wallet(process.env.ACCOUNT1, provider);



const main = async () => {
  const getHello = await contract.getGreet();
  console.log(getHello)

  const contractWithWallet = contract.connect(wallet);

  const writeToContract = await contractWithWallet.setGreet("HELLO WORLD")
  await writeToContract.wait()
  console.log(writeToContract);

  const getAfterHello = await contract.getGreet();
  console.log(getAfterHello)
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })