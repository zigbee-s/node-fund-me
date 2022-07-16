require('dotenv').config()
const { ethers } = require("ethers");
const { abi, contractAddress } = require ("./constants/factory_constants.js")

ALCHEMY_API_KEY=process.env.ALCHEMY_API_KEY
META_PRIVATE_KEY=process.env.META_PRIVATE_KEY

module.exports.getKeys = async function getKeys(){
    console.log(`Calling GetKeys method`)
    
    const provider = new ethers.providers.AlchemyProvider(network="rinkeby", ALCHEMY_API_KEY )
    // Provider
    const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", );

    // Signer
    const signer = new ethers.Wallet(META_PRIVATE_KEY, alchemyProvider);
    
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
        const result = await contract.getKeys()
        return result
    } catch (error) {
        console.log(error)
    }
}
