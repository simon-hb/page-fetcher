const request = require('request');
const fs = require('fs');
const args = process.argv;
let inputs = args.slice(2);


const getFileSizeInBytes = function(fileName, callback) {
  fs.stat(fileName, (error, stats) => {
    if (error) throw error;
    let fileSizeInBytes = stats["size"]
    callback(fileSizeInBytes);
  })
}

request(inputs[0], (error, response, body) => {
  if (error) throw error; 
  fs.writeFile(inputs[1], body, (error) => {
    if (error) throw error;
    getFileSizeInBytes(inputs[1], size => {
      console.log(`Downloaded and saved ${size} bytes to ${inputs[1]}`);
    })
  });
});
