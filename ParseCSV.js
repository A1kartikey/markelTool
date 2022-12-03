const csv = require('csv-parser')
const fs = require('fs')
const results = [];


const csvRead = function bd() {
  return new Promise((resolve, reject) => {
      
    fs.createReadStream('MockDataforExchangeSetup.csv')
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
              resolve(results);
          });
  });
}

module.exports = csvRead ;
