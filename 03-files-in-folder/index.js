const fs = require('fs/promises');
const path = require('path');

const pathToDir = path.join(__dirname, 'secret-folder');

async function showFilesInfo() {
  try {
    const files = await fs.readdir(pathToDir, { withFileTypes: true });

    for (const file of files) {
      const pathToFile = path.join(pathToDir, file.name);

      if (file.isFile()) {
        const fileInfo = await fs.stat(pathToFile);

        const fileExtension = path.extname(file.name).slice(1);

        console.log(`${file.name} - ${fileExtension} - ${fileInfo.size}`);
      }
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

showFilesInfo();
