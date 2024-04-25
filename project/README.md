# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

```shell
npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-verify@^2.0.0" "chai@^4.2.0" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.0" "@types/chai@^4.2.0" "@types/mocha@>=9.1.0" "@types/node@>=18.0.0" "ts-node@>=8.0.0" "typescript@~5.0.4" "@nomicfoundation/hardhat-toolbox-viem@^2.0.0" "@nomicfoundation/hardhat-viem@^1.0.0" "viem@^1.15.1" "@types/chai-as-promised@^7.1.6"
```

### Creating account 

npx hardhat account wont return anything

change the hardhat.config.ts
**from** 
```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

export default config;
```
**to**
```ts
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};
// prints the accounts with hardhat runtime envioronment
task("accounts","Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.viem.getWalletClients();
    for (const account of accounts) {
        console.log(account.account.address);
    }
})
export default config;
```

now **npx hardhat accounts** will work
"Prints the list of accounts" is just a description in the above code

```sh
npm install mocha
mkdir test
```
**run this**
```ts
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
```

**describe** statement from mocha describes a suite/ gorup of tests and takes a function as another parameter

**viem** for 