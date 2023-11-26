# TonTutorial
Tutorial on FunC for TON Blockchain Development

## Dev Notes
For all the details refer to the devNotes.txt in the root folder.

### First Contract
Resource - https://ton-community.github.io/tutorials/02-contract/
Initiate the project - npm create ton@latest

Local Blockchain Development 
1. @ton-community/sandbox --> This is for everything, Storage Phase, Credit Phase, Compute Phase, Action Phase and Bounce Phase
https://www.npmjs.com/package/@ton-community/sandbox

2. ton-contract-executor --> This is only for the execution and does not envolve and fee calculation, Technically only the Compute Phase, Action Phase and Bounce Phase
https://www.npmjs.com/package/ton-contract-executor

.env for deployment
WALLET_MNEMONIC="your_mnemonic_key"
WALLET_VERSION="v4"


Second Contract
Counter 

Commands 

choose a smart contract and build it
``` 
npx blueprint build
```

Run the default project test suite
```
npx blueprint test
```
 
Choose a script and run it (eg. a deploy script)
```
npx blueprint run
```

Create all the necessary files for another new contract
```
npx blueprint create AnotherContract
```
