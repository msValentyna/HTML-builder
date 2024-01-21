const { unlink, copyFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files');
const pathToCopy = path.join(__dirname, 'files-copy');

async function copyFiles() {
  fs.mkdir(pathToCopy, { recursive: true }, (error) => {
    if (error) {
      throw error;
    }
  });

  const files = await fs.readdir(pathToCopy, { withFileTypes: true });

  for (const file of files) {
    const pathToFile = path.join(pathToCopy, file.name);
    try {
      await unlink(pathToFile);
      console.log('deleted');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  try {
    const files = await fs.readdir(pathToFolder, { withFileTypes: true });
    for (const file of files) {
      copyFile(
        path.join(pathToFolder, file.name),
        path.join(pathToCopy, file.name),
        (error) => {
          console.log(`The ${file.name} has already been copied`);
          if (error) {
            throw error;
          }
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
}

copyFiles();
