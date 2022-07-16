import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
import { abi} from "./fundme_constants.js"



const connectButton = document.getElementById("connectButton")

/*
const withdrawButton = document.getElementsByClassName("withdrawButton")
const fundButton = document.getElementsByClassName("fundButton")
const balanceButton = document.getElementsByClassName("balanceButton")
const getOwnerButton = document.getElementsByClassName("getOwnerButton")
*/



connectButton.onclick = connect

/*
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance
getOwnerButton.onclick = getOwner
*/


async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}



$(function() {
  $('button.withdraw').click(function() {
    const address = $(this).data('id');
    console.log(`Withdrawing...`)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(address, abi, signer)
      
          contract.withdraw()
          .then(transactionResponse => {
              listenForTransactionMine(transactionResponse, provider)
              .catch(err => {
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err);
            alert(`Something went wrong\ 
            Note: Only the owner of this contract can withdraw funds`)
          })

    } else {
      alert("Please install MetaMask")
    }
  });
});



$(function() {
  $('form.fund').submit(function() {
    const address = $(this).data('id');
    const ethAmount = document.getElementById(address).value
    console.log(`Funding with ${ethAmount}...`)

    
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        
          contract.fund({ value: ethers.utils.parseEther(ethAmount)})
          .then(transactionResponse => {
              listenForTransactionMine(transactionResponse, provider)
              .catch(err => {
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err);
          })        
      } else {
        alert("Please install MetaMask")
      }
  });
});



$(function () {
  $('button.getOwner').click(function() {
      const address = $(this).data('id');
      console.log(`Calling GetOwner method`)
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(address, abi, signer)
        
          contract.getOwner()
          .then(result => {
            console.log('The Owner is -> ', result);
          })
          .catch(err => {
            console.log(err);
          })
       

      } else {
        alert("Please install MetaMask")
      }
    });
});


$(function () {
  $('button.balance').click(function() {
      const address = $(this).data('id');
      if (typeof window.ethereum !== "undefined") {
        console.log("Calling getBalnce method")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
              
              provider.getBalance(address)
              .then(balance => {
                console.log(ethers.utils.formatEther(balance));          })
              .catch(err => {
                console.log(err);
              })
       

      } else {
        alert("Please install MetaMask")
      }
    });
});





function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations. `
      )
      resolve()
    })
  })
}


