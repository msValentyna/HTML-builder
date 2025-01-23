const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('Введите текст. ');

rl.prompt();

rl.on('line', (answer) => {
  if (answer.trim() === 'exit') {
    rl.close();
  } else {
    writeStream.write(answer + '\n', (err) => {
      if (err) {
        console.log('Ошибка записи в файл ', err);
      }
    });
  }
});

rl.on('close', () => {
  writeStream.end();
  console.log('Запись в файл завершена.');
});

// node 02-write-file
