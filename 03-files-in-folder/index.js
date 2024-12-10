const path = require('path');
const fs = require('fs').promises;

const dirPath = path.join(__dirname, 'secret-folder');

async function readFiles() {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(dirPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        const fileName = path.basename(file.name, path.extname(file.name));
        const stats = await fs.stat(filePath);
        const fileSizeKb = stats.size / 1024;
        console.log(`${fileName} - ${fileExt} - ${fileSizeKb} kb`);
      }
    }
  } catch (err) {
    console.log('Ошибка чтения файлов ', err);
  }
}

readFiles();
