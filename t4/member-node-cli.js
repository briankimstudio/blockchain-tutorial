Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.accounts;
code = fs.readFileSync('member.sol').toString();
contract =  web3.eth.compile.solidity(code);
MemberContract = web3.eth.contract(contract.info.abiDefinition)
deployedContract = MemberContract.new({data: contract.code, from: web3.eth.accounts[0], gas: 4700000})
contractInstance = MemberContract.at(deployedContract.address)
deployedContract.address



contractInstance.getTotal.call().toString();
contractInstance.createMember("111","aaa","a1a1",{from: web3.eth.accounts[0], gas: 4700000})
contractInstance.getMember.call('111')
contractInstance.createMember("222","bbb","b1b1",{from: web3.eth.accounts[0], gas: 4700000})
contractInstance.getMember.call('222')
contractInstance.getTotal.call().toString();


web3.personal.unlockAccount(web3.eth.accounts[0],'1234')
