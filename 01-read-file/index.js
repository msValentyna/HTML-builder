const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
// console.log(pathToFile);
const readStream = fs.createReadStream(pathToFile, 'utf8');
readStream.pipe(process.stdout);
