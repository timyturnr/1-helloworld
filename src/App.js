import { useState } from 'react';
import { ethers } from 'ethers';
import Helloworld from './artifacts/contracts/Helloworld.sol/Helloworld.json';
import './App.css';

const contractAddress = "0xe270C6cfaB0B43e7eA7195282C52F08AbD3fAF87";




function App() {
  const [message, setMessage] = useState("");


  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, Helloworld.abi, provider);
      try {
        const data = await contract.getGreet();
        console.log(`Data: ${data}`)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    }
  }

  async function setGreeting() {
    if (!message) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()

      const contract = new ethers.Contract(contractAddress, Helloworld.abi, signer);
      const transaction = await contract.setGreet(message);

      setMessage("");

      await transaction.wait();
      fetchGreeting();

    }
  }

  return (
    <div className="App">
      <div className="description">
        <h2>Hello World DApp</h2>
        <h3>ReactJS + Hardhat</h3>
      </div>
      <div className="functionality">
        <div className="buttons">
          <button
            onClick={fetchGreeting}
          >Fetch Greeting</button>
          <button
            onClick={setGreeting}
          >Set Greeting</button>
        </div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder='Set Greeting Message' />
      </div>

    </div>
  );
}

export default App;
