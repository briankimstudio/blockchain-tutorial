# Installation on Macos

```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install ethereum

npm install -g solc
```

# Overview

The purpose of this tutorial is to provide hands-on experience on building private Ethereum network and test smart contract on Linux environment. 
 
* Create Blockchain Account for Private Network
* Create Private Blockchain Network
⋅⋅* Genesis Block
⋅⋅* Pre-allocate Ether to Account
* Compile SC(Smart Contract)
* Launch Ethereum Node Process
* Submit SC
* Execute SC


# Steps

## Create Blockchain Account for Private Network

```
$ geth account new --datadir .ethereum-private

Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {9ba0798fc2e5502d8353028c213b49a3e1e1f6a9}
```

## Create Private Blockchain Network

In this step, it creates necessary data structure for maintaining blockchain for private network based on the content of genesis block.

Substitute ACCOUNT in genesis.json to newly created account number

```
$ geth --datadir .ethereum-private init genesis.json 

INFO [05-23|13:33:35] Allocated cache and file handles         database=/Users/demo/Project/bc/test/.ethereum-private/geth/chaindata cache=16 handles=16
INFO [05-23|13:33:35] Writing custom genesis block 
INFO [05-23|13:33:35] Successfully wrote genesis state         database=chaindata                                                     hash=ed6c51…624943
INFO [05-23|13:33:35] Allocated cache and file handles         database=/Users/demo/Project/bc/test/.ethereum-private/geth/lightchaindata cache=16 handles=16
INFO [05-23|13:33:35] Writing custom genesis block 
INFO [05-23|13:33:35] Successfully wrote genesis state         database=lightchaindata                                                     hash=ed6c51…624943
```

Genesis Block for Private Network

## Compile SC

*WARNING! The current version of geth use different method to compile smart contract compared to previous version of geth and the smart contract tutorial on official Ethereum website does not work. Because it has not been updated according to new method. This is the right way for current version of geth.*

```
$ echo "var greeterCompiled=`solc --optimize --combined-json abi,bin,interface HelloNCHU.sol`" > HelloNCHU.js
```

## Launch Ethereum Node Process

In this step, it actually launches Linux process working as a node for private Ethereum network.

```
$ geth --mine --minerthreads=1 --datadir .ethereum-private --networkid 123456789 --nodiscover --maxpeers 0 console 2>> .ethereum-private.log

Welcome to the Geth JavaScript console!

instance: Geth/v1.6.1-stable-021c3c28/darwin-amd64/go1.8.1
coinbase: 0x9ba0798fc2e5502d8353028c213b49a3e1e1f6a9
at block: 0 (Thu, 01 Jan 1970 08:00:00 CST)
 datadir: /Users/tskim/Project/bc/test/.ethereum-private
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```

## Unlock Account to submit SC 

```
web3.fromWei(eth.accounts[0],"ether")
primary = eth.accounts[0]
personal.unlockAccount(primary)

Unlock account 0x9ba0798fc2e5502d8353028c213b49a3e1e1f6a9
Passphrase: 
true
```

## Submit compiled SC

```
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
```
In this step, smart contract has ben submitted to the network successfully, then it has been mined after several seconds.

## Check Address of SC

```
> eth.getCode(greeter.address)
"0x606060405263ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166341c0e1b58114610045578063cfae321714610057575bfe5b341561004d57fe5b6100556100e7565b005b341561005f57fe5b610067610129565b6040805160208082528351818301528351919283929083019185019080838382156100ad575b8051825260208311156100ad57601f19909201916020918201910161008d565b505050905090810190601f1680156100d95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000543373ffffffffffffffffffffffffffffffffffffffff908116911614156101265760005473ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6101316101c1565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156101b65780601f1061018b576101008083540402835291602001916101b6565b820191906000526020600020905b81548152906001019060200180831161019957829003601f168201915b505050505090505b90565b604080516020810190915260008152905600a165627a7a723058200d18cdd7e67ed1701ac687be35dda0246ab2ee165e5323ad3f963ad6d7c7f6cf0029"
```

## Execute SC

```
> greeter.greet()
"Hello NCHU!"
```
