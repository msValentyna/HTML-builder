const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    await fs.mkdir(newFolderPath, { recursive: true });

    for (const file of files) {
      if (file.isFile()) {
        await fs.copyFile(
          path.join(folderPath, file.name),
          path.join(newFolderPath, file.name),
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir();
