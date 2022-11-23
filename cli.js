var MerkleTools = require('merkle-tools') ;
var csvRead = require('./ParseCSV.js') ;

async function markelTress( ) { 
    var concatResult = [] ; 

 await csvRead().then((results) => {
   
       results.forEach(element => {
   
         concatResult.push( element.NAME + ' '+ element.AGE );
       });
     console.log("concatResult: ",concatResult ) ;
   })
   
   var merkleTools = new MerkleTools() // no options, defaults to sha-256 hash type
   

   // add some leaves to the tree
   merkleTools.addLeaf('7d49f074d2c3fa193e305bc109892f20760cbbecc218b43394a9356da35a72b3')
   merkleTools.addLeaf('ba78a656108137a01f104b82a3554cedffce9f36e8a4149d68e0310b0943c09d')
   merkleTools.addLeaves(['x', 'y', 'z'], true) // we must indicate these values need to be hashed
   
   
   var markelRoot = merkleTools.makeTree()
   console.log('Tree: ',markelRoot);
   
   console.log('leaves: '
               ,markelRoot.leaves[0].toString('hex'),
               markelRoot.leaves[1].toString('hex') ,
               markelRoot.leaves[2].toString('hex')
               );
   
   console.log('levels: ',markelRoot.levels[0][0].toString('hex')); 
   
   
   var rootValue = merkleTools.getMerkleRoot()
   console.log('Markel Root: ',rootValue.toString('hex'));
   
   var leafValue =  merkleTools.getLeaf(0)
   console.log('Markel Value: ',leafValue.toString('hex'));
   
   var leafCount =  merkleTools.getLeafCount()
   console.log('Leaf count: ',leafCount );
   var proof0 = merkleTools.getProof(0)
   console.log('proof0: ',proof0);
   var proof1 = merkleTools.getProof(1)
   console.log('proof1: ',proof1);
   var proof2 = merkleTools.getProof(2)
   console.log('proof2: ',proof2);

   const proof = [
    { right: '09096dbc49b7909917e13b795ebf289ace50b870440f10424af8845fb7761ea5' },
    { right: 'ed2456914e48c1e17b7bd922177291ef8b7f553edf1b1f66b6fc1a076524b22f' },
    { left: 'eac53dde9661daf47a428efea28c81a021c06d64f98eeabbdcff442d992153a8' }
  ];
  const targetHash =
    '36e0fd847d927d68475f32a94efff30812ee3ce87c7752973f4dd7476aa2e97e';
  const merkleRoot =
    'b8b1f39aa2e3fc2dde37f3df04e829f514fb98369b522bfb35c663befa896766';
  
  const isValid = merkleTools.validateProof(proof, targetHash, merkleRoot);
  console.log("Verify: ",isValid) ;
   
   merkleTools.resetTree() // use this when done with this tree and you intend on creating a new one
}

markelTress() ; 
