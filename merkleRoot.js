const { MerkleTree } = require('merkletreejs')
const  ethers = require ("ethers") ;
const  keccak256 = require ("keccak256") 
// inputs: array of users' addresses and quantity
// each item in the inputs array is a block of data
// Alice, Bob and Carol's data respectively
const inputs = [
  {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    quantity: 1,
  },
  {
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    quantity: 2,
  },
  {
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    quantity: 1,
  },
];
// create leaves from users' address and quantity
const leaves = inputs.map((x) =>
  ethers.utils.solidityKeccak256(
    ["address", "uint256"],
    [x.address, x.quantity]
  )
);

console.log()
// create a Merkle tree
const tree = new MerkleTree(leaves, keccak256, { sort: true });
console.log(tree.toString());

const proofs = leaves.map(leave=> tree.getHexProof('b783e75c6c50486379cdb997f72be5bb2b6faae5b2251999cae874bc1b040af7'))
console.log(proofs);

const root = tree.getHexRoot();
console.log(root)

console.log(tree.verify(proofs, 'b783e75c6c50486379cdb997f72be5bb2b6faae5b2251999cae874bc1b040af7', root)) // true