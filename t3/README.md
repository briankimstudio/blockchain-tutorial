On terminal 1

$ ./node_modules/.bin/testrpc
EthereumJS TestRPC v3.0.5

Available Accounts
==================
(0) 0x1392aa15ecc8b7a8a317c379597e279da1a884e5
(1) 0xb8e199edfe1508fe8ffb092b1124c743fe055c36
(2) 0x557de657714249d24252ab877d8ad6b387115fe0
(3) 0xd279e75b19a067219e2710357b30034b20e7e9c1
(4) 0x370707021b9a32552eb361499542269aad9ea4b5
(5) 0x0009c4c98bc7786b69fe9d2a285b38ca2d4c1d3a
(6) 0x3dd600c5cae88eb685f3bd8f0c14ff77bd79b53e
(7) 0x4c20b3eff5454aeafd0b96a4be9d1c09aee84b4f
(8) 0x864c422d716eac66bcb2320c5e6afb66cea468bd
(9) 0x6b29b7f153fea280f09a2e99fcd3986439ecd303

Private Keys
==================
(0) 1f9d41336293ef0df584ee34e872d863bf5a330653c3a0c4c9ff9a3d0919e069
(1) f8e645bb0a81580e95c7bb857ae56ace453ad61fc5fbd3b2b50f5c1db970f11d
(2) 2beccba6d8b8d7e5c55cb681268c6f322ecd9b6c7cf3adc5579a8579de52065e
(3) 1aec3794ded4fbbd8059447a783256d6bc263cb295534330362c7a1c0d0ec793
(4) dfe52c8f03d2141f37316663e9e300307fe4fac123b97d2d7047642f2d1cfd1b
(5) 1cbd99240b9b836b7ef1f7dd52d2bf51e412e971c07585c2b1c6c245e84fd452
(6) cdccb4ffff3b54ebc000dabbbd582a676700d37e1987c2f45cb79dfccc5cb877
(7) 82e8018de1966540c03512ca7db5417d5633dda4e6347b485276c6afb2caac3a
(8) b1e70973db89bdb603b692b21d528ac41a89e4b28a8be7356a54ec50403cade6
(9) faba8e5d5c7bedc9f73a2f34a6307a18359f7dd3bb43545d138ec9c2f92279fa

HD Wallet
==================
Mnemonic:      magnet off clever attract lunar bench defy chef tail few tornado warfare
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545

On terminal 2

$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

> web3.eth.accounts

Compile
> code = fs.readFileSync('Voting.sol').toString()
> contract =  web3.eth.compile.solidity(code)

> VotingContract = web3.eth.contract(contract.info.abiDefinition)
> deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: contract.code, from: web3.eth.accounts[0], gas: 4700000})
> contractInstance = VotingContract.at(deployedContract.address)

> contractInstance.totalVotesFor.call('Rama')
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})
> contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]})

> contractInstance.totalVotesFor.call('Rama').toLocaleString()

On Web

$ bower install web3

file:///FULL_PATH_TO_PROJECT/index.html