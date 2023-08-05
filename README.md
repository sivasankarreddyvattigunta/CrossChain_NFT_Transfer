# Polygon-Advanced-Module-1

This is the first project in Polygon-Advance, in this project, I was tasked to deploy an NFT collection on the Ethereum blockchain, Map the collection to Polygon, and Transfer assets over via the Polygon Bridge.

## Getting Started

### Executing program

Download the codes by downloading the entire repository which will give you access to other contents of the repository. Navigate to the Poly_Proof project directory,  run:

```shell

 npm install

```

After installing the dependencies, run the test file by using the following command:

```shell
npx hardhat test
```

### Deploying the ERC721 Contract

Before deploying, make sure to rename ".env.example" to ".env" and provide your wallet private key where required i.e. "PRIVATE_KEY= 'your wallet private key'". Run the following command to deploy the ERC721 contract to the Goerli Ethereum Testnet:

``` shell
npx hardhat run scripts/deploy.js --network goerli 
```
## NOTE:
After deploying the address will generate. So, copy that address into `contarctAddress.js`(stored in metadata folder) and also in `batchMint.js`(stored in scripts folder)

 
The script will deploy the contract 
### Batch Mint NFTs

Run the following command to batch-mint NFTs using the deployed ERC721 contract:

``` shell
npx hardhat run scripts/batchMint.js --network goerli
```

The script will mint the specified number of NFTs and assign them to your address.

### Approve and Deposit NFTs to Polygon Mumbai

Run the following commands to approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network using the FxPortal Bridge:

```shell
npx hardhat run scripts/approveDeposit.js --network goerli
```



## Author

[Tushar Gangurde](https://github.com/Tushar282002)

## License

This project is licensed under the [MIT License](LICENSE).
You can make a copy of the project to use for your own purposes.
