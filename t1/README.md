# Overview

The purpose of this tutorial is to provide hands-on experience on building private Ethereum network and test smart contract on Linux environment. 
 
* Create Blockchain Account for Private Network
* Create Private Blockchain Network
  + Genesis Block  
  + Pre-allocate Ether to Account
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
## Genesis Block for Private Network

```
{
    "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "0x1",
    "gasLimit": "2100000",
    "alloc": {
        "ACCOUNT": { "balance": "40000000000000000" }
    }
}
```
Substitute ACCOUNT in `genesis.json` to newly created account number

## Create Private Blockchain Network

In this step, it creates necessary data structure for maintaining blockchain for private network based on the content of genesis block.

```
$ geth --datadir .ethereum-private init genesis.json 

INFO [05-23|13:33:35] Allocated cache and file handles         database=/Users/demo/Project/bc/test/.ethereum-private/geth/chaindata cache=16 handles=16
INFO [05-23|13:33:35] Writing custom genesis block 
INFO [05-23|13:33:35] Successfully wrote genesis state         database=chaindata                                                     hash=ed6c51…624943
INFO [05-23|13:33:35] Allocated cache and file handles         database=/Users/demo/Project/bc/test/.ethereum-private/geth/lightchaindata cache=16 handles=16
INFO [05-23|13:33:35] Writing custom genesis block 
INFO [05-23|13:33:35] Successfully wrote genesis state         database=lightchaindata                                                     hash=ed6c51…624943
```


## Source code of Smart Contract

```
pragma solidity ^0.4.8;

contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract greeter is mortal {
    /* define variable greeting of the type string */
    string greeting;

    /* this runs when the contract is executed */
    function greeter(string _greeting) public {
        greeting = _greeting;
    }

    /* main function */
    function greet() constant returns (string) {
        return greeting;
    }
}
```

## Compile Smart Contract

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

## Unlock Account to submit Smart Contract 

Copy and paste 3 lines in the following code into `geth console`, then it will ask Phassphrase to unlock the account to pay  ether for submitting smart contract to blockchain network.

```
web3.fromWei(eth.accounts[0],"ether")
primary = eth.accounts[0]
personal.unlockAccount(primary)

Unlock account 0x9ba0798fc2e5502d8353028c213b49a3e1e1f6a9
Passphrase: 
true
```

## Submit compiled Smart Contract

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
In this step, smart contract has ben submitted to the network successfully, then it will be mined after several seconds. Once it is mined, you will see `Contract mined!` on console.

## Check Address of Smart Contract

This step is for informational purpose only.

```
> eth.getCode(greeter.address)
"0x606060405263ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166341c0e1b58114610045578063cfae321714610057575bfe5b341561004d57fe5b6100556100e7565b005b341561005f57fe5b610067610129565b6040805160208082528351818301528351919283929083019185019080838382156100ad575b8051825260208311156100ad57601f19909201916020918201910161008d565b505050905090810190601f1680156100d95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000543373ffffffffffffffffffffffffffffffffffffffff908116911614156101265760005473ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6101316101c1565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156101b65780601f1061018b576101008083540402835291602001916101b6565b820191906000526020600020905b81548152906001019060200180831161019957829003601f168201915b505050505090505b90565b604080516020810190915260008152905600a165627a7a723058200d18cdd7e67ed1701ac687be35dda0246ab2ee165e5323ad3f963ad6d7c7f6cf0029"
```

## Execute Smart Contract

Once smart contract is mined, you can call it just like calling regular function and it will show the output.

```
> greeter.greet()
"Hello NCHU!"
```
