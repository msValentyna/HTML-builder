const fs = require('fs').promises;
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distPath, 'bundle.css');

async function mergeStyles() {
  try {
    const stylesArray = [];
    const files = await fs.readdir(srcPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(srcPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        if (fileExt === 'css') {
          const data = await fs.readFile(filePath, 'utf8');
          stylesArray.push(data);
        }
      }
    }
    await fs.writeFile(bundlePath, stylesArray.join('\n'), 'utf8');
  } catch (err) {
    console.log(err);
  }
}

mergeStyles();
