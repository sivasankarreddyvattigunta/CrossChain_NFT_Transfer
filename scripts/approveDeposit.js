const hre = require("hardhat");
const ethers = hre.ethers;
const FxContractAbi = require("../fxrootABI.json");

async function main() {
  console.log("Connected to network:", hre.network.name);
  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // address for bridge
  const deployedAddress = "0xD219242251E9Eb7Dc5fED30a2773B48B0a6ecF6D"; // address of deployed contract

  const nft = await hre.ethers.getContractFactory("siva");
  const contract = await nft.attach(deployedAddress);
  console.log("Contract address:", contract.address);

  // Token IDs of the NFTs you want to send
  const tokenIds = [0, 1, 2, 3, 4];
  const wallet = "0x330c75B827643Bd2D2b0A61e3fD39f80222Ae05B"; // Wallet address

  // Gas limit for each transaction 
  const gasLimit = 300000; 

  // Approve and deposit each token to the FxPortal Bridge for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Confirm token with token ID ${tokenId} for transfer`);
    await contract.approve(bridgeAddress, tokenId);

    console.log(`Deposit token with token ID ${tokenId} to the Bridge`);
    try {
      const fxContract = await hre.ethers.getContractAt(FxContractAbi, bridgeAddress);
      const depositTx = await fxContract.deposit(deployedAddress, wallet, tokenId, "0x6996", {
        gasLimit: ethers.BigNumber.from(gasLimit),
      });
      await depositTx.wait();

      console.log(`Token with token ID ${tokenId} deposited on the Bridge`);
    } catch (error) {
      console.error(`Error depositing token with token ID ${tokenId}:`, error);
      // If there's an error, you might want to handle it accordingly
    }
  }
  console.log("Transfer of tokens executed completely");

  // Print the balance of the wallet
  const walletBalance = await ethers.provider.getBalance(wallet);
  console.log("Balance of the wallet is:", walletBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
