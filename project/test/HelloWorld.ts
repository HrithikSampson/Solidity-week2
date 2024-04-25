import { expect } from "chai";
import { viem } from "hardhat"; // Many parameters are configured if i import from hardhat
import hre from "hardhat";// this also works
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe("HelloWorld",() => {
  it('should return "Hello World!"', function () {
    expect('Hello World!').to.equal('Hello World!');
  });
  it('should give a Helloworld',async function () {
    //publicClient is a fake blockchain
    const publicClient = await viem.getPublicClient(); // proof that is is connected to the blockchain
    const block = await publicClient.getBlock();
    console.log(block);
    const helloWorldCOntract = await viem.deployContract("HelloWorld");
    const helloWorldText = await helloWorldCOntract.read.helloWorld();
    expect("Hello World").to.equal(helloWorldText);
  });
  it('should change text',async function () {
    
    const helloWorldCOntract = await viem.deployContract("HelloWorld");
    const tx = await helloWorldCOntract.write.setText(["Potato"]);
    const publicClient = await viem.getPublicClient();
    const receipt = await publicClient.getTransactionReceipt({hash: tx});
    if(!receipt.contractAddress) throw new Error("Contract not Deployed");
    const helloWorldText = await helloWorldCOntract.read.helloWorld();
    expect(helloWorldText).to.eq("Potato");
  });
})
