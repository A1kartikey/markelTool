const { MerkleTree } = require('merkletreejs') ;
const SHA256 = require('crypto-js/sha256') ;
var csvRead = require('./ParseCSV.js') ;

async function markelTress( ) { 

var concatResult = [] ; 
var Tree = { } ;

await csvRead().then((results) => {
   
    results.forEach(element => {

      concatResult.push( element.NAME + ' '+ element.AGE );
    });
  console.log("concatResult: ",concatResult ) ;
})
// const leaves = ['a', 'b', 'c'].map(x => SHA256(x))

const tree = new MerkleTree(concatResult, SHA256)
// console.log('Leaves: ',tree.leaves[0].toString('hex'));
// console.log('Tree: ',tree.layers);

var arry = [] ; 
var foo =1 ;

tree.layers.forEach(element => {
    arry = [] ;
    element.forEach( x  => {        
        arry.push(x.toString('hex'));
    })

    Tree['level'+ `${foo}` ]  = arry ;
    foo++ ;
    
});

console.log('Tree: ',Tree) ;

// console.log('Root: ',tree.layers[2][0].toString('hex'))
const root = tree.getRoot().toString('hex')
console.log( 'root: ',root);
// const leaf = SHA256('a')
// console.log("Leaf a :",leaf);
 const proof = tree.getProof(Tree['level1'][0]) ;
 console.log('Proof of 0:  ',proof) ; 
console.log(tree.verify(proof, Tree['level1'][0], root)) // true

}

markelTress() ; 