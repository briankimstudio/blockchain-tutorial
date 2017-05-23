Installation on Macos

brew update
brew upgrade
brew tap ethereum/ethereum
brew install ethereum

npm install -g solc

Steps

$ geth account new --datadir .ethereum-private

Substitute ACCOUNT in genesis.json to newly created account number

$ geth --datadir .ethereum-private init genesis.json 

$ echo "var greeterCompiled=`solc --optimize --combined-json abi,bin,interface HelloNCHU.sol`" > HelloNCHU.js

$ geth --mine --minerthreads=1 --datadir .ethereum-private --networkid 123456789 --nodiscover --maxpeers 0 console 2>> .ethereum-private.log

web3.fromWei(eth.accounts[0],"ether")
primary = eth.accounts[0]
personal.unlockAccount(primary)

loadScript("HelloNCHU.js");
var _greeting = "Hello NCHU!";
var greeterContract = web3.eth.contract(JSON.parse(greeterCompiled.contracts["HelloNCHU.sol:greeter"].abi));
var greeter = greeterContract.new(_greeting, {from: eth.accounts[0], data: "0x" + greeterCompiled.contracts["HelloNCHU.sol:greeter"].bin, gas: 1000000}, function(e, contract){
  if(!e) {

    if(!contract.address) {
      console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

    } else {
      console.log("Contract mined! Address: " + contract.address);
   }
  }
})

> eth.getCode(greeter.address)

> greeter.greet()