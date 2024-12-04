const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(filePath, 'utf8');

readableStream.on('data', (chunk) => {
  console.log(chunk);
});

readableStream.on('error', (err) => {
  console.log('File read error:', err.message);
});

// node 01-read-file
