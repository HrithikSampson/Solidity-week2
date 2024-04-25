import {abi,bytecode } from '../artifacts/contracts/Ballot.sol/Ballot.json'
import {sepolia} from 'viem/chains'
import { createPublicClient,http,createWalletClient,formatEther, Address, toHex, hexToString } from 'viem'
import * as dotenv from 'dotenv';
import { create } from 'domain';
import { privateKeyToAccount} from 'viem/accounts';
dotenv.config();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY || "";
const providerAPIKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
    const proposals = process.argv.slice(2);
    if(!proposals || proposals.length < 1)
        throw new Error("Proporsals not provided");
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerAPIKey}`),
    });
    const blockNumber = await publicClient.getBlockNumber();
    const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
    const deployer = createWalletClient({
        account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerAPIKey}`),
    });
    const hash = await deployer.deployContract({
        abi,
        bytecode: bytecode as Address,
        args:[proposals.map((proporsal)=> toHex(proporsal,{size: 32}))],
    })
    const receipt = await publicClient.waitForTransactionReceipt({hash});
    if(!receipt.contractAddress) throw new Error("Contract not yet Deployed");
    for(let index = 0;index < proposals.length; index++) {
        const proposal = await publicClient.readContract({address: receipt.contractAddress,
        abi,
        functionName: "proposals",
        args: [BigInt(index)],}) as any[];
        const name = hexToString(proposal[0],{size:32});
        console.log({index,name,proposal});
    }
}
main().catch((error)=>{
    console.error(error);
})