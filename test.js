const { MerkleTree } = require('merkletreejs') ;
const SHA256 = require('crypto-js/sha256') ;
var csvRead = require('./ParseCSV.js') ;

async function markelTress( ) { 

    // Internally, trees are made of nodes containing Buffer values only
  // This helps ensure that leaves being added are Buffers, and will convert hex to Buffer if needed
  function _getBuffer (value) {
    if (value instanceof Buffer) { // we already have a buffer, so return it
      return value
    } else if (_isHex(value)) { // the value is a hex string, convert to buffer and return
      return Buffer.from(value, 'hex')
    } else { // the value is neither buffer nor hex string, will not process this, throw error
      throw new Error("Bad hex value - '" + value + "'")
    }
  }

  function _isHex (value) {
    var hexRegex = /^[0-9A-Fa-f]{2,}$/
    return hexRegex.test(value)
  }

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

 proof.forEach(x => { 

    x.data = x.data.toString('hex') ;  
 })


 console.log('Proof of 0 HEX:  ',proof) ; 

//  proof.forEach(x => { 

//   x.data =  _getBuffer (x.data);  
// })

console.log('Proof of 0 buffer:  ',proof) ; 

console.log('Tree leaf: ',Tree['level1'][0]) ;

console.log('ROOT: ',root) ;

console.log(tree.verify(proof, Tree['level1'][0], root)) // true

}

markelTress() ; 