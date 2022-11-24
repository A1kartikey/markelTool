const { MerkleTree } = require('merkletreejs') ;
const SHA256 = require('crypto-js/sha256') ;
var csvRead = require('./ParseCSV.js') ;
var bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000

 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var tree = 0 ;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/genrateMerkelTree', async (req, res) => {

var concatResult = [] ; 
var Tree = { } ;

await csvRead().then((results) => {
   
    results.forEach(element => {

      concatResult.push( element.ACCOUNT + ' '+ element.AMOUNT );
    });
  console.log("concatResult: ",concatResult ) ;
})

 tree = new MerkleTree(concatResult, SHA256)
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

res.send(Tree) ;

})

app.get('/GetProof', async (req, res) => { 

    // console.log(req.query.leaf) ;

    const proof = tree.getProof(req.query.leaf) ;

    proof.forEach(x => { 

      x.data = x.data.toString('hex') ;  
    })

    res.send(proof);

} )

app.get('/GetLeaves', async (req, res) => { 

    var array = [] ;
    tree.leaves.forEach(x => {

        array.push(x.toString('hex') ) ;
    })

    // console.log(array) ;
    
    res.send(array);

} )

app.post('/VerifyleafProof', jsonParser, async (req, res) => { 

     console.log( req.body ) ;
    // console.log(tree.verify(proof, Tree['level1'][0], root)) // true
    const verify = tree.verify(req.body.proof, req.body.leaf, req.body.root) ;

    if (verify) 
    res.send('Proof validation successfully !! Thanks ');
    else
    res.send('Proof validation unsuccessfully !! Try Again') ; 

} )

app.get('/GetRoot', async (req, res) => { 

   
    const root = tree.getRoot().toString('hex') ;

    res.send(root);

} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

