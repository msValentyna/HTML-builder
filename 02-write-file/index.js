const fs = require('fs');
const readline = require('readline');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

console.log('Hello! Enter some text, or type "exit" to finish.');

const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

rl.prompt();

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Thank you! Goodbye!');
    process.exit();
  }

  fs.appendFile(pathToFile, `${input}\n`, { flag: 'a' }, (error) => {
    if (error) {
      console.error('Error:', error);
      rl.close();
      process.exit();
    } else {
      rl.prompt();
    }
  });
});

rl.on('close', () => {
  console.log('Thank you! Goodbye!');
  rl.close();
  process.exit();
});
