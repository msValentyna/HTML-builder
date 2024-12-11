const fs = require('fs').promises;
const path = require('path');

const assetsSrcPath = path.join(__dirname, 'assets');
const stylesSrcPath = path.join(__dirname, 'styles');
const projectDistPath = path.join(__dirname, 'project-dist');
const assetsDistPath = path.join(projectDistPath, 'assets');

const componentsHtml = path.join(__dirname, 'components');
const templateHtml = path.join(__dirname, 'template.html');
const distHtml = path.join(projectDistPath, 'index.html');

async function mergeStyles() {
  try {
    const stylesArray = [];
    const files = await fs.readdir(stylesSrcPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(stylesSrcPath, file.name);
        const fileExt = path.extname(filePath).slice(1);
        if (fileExt === 'css') {
          const data = await fs.readFile(filePath, 'utf8');
          stylesArray.push(data);
        }
      }
    }
    await fs.writeFile(
      path.join(projectDistPath, 'style.css'),
      stylesArray.join('\n'),
      'utf8',
    );
  } catch (err) {
    console.log('Ошибка при объединении стилей ', err);
  }
}

async function copyDir(src, dist) {
  try {
    await fs.mkdir(dist, { recursive: true });
    const source = await fs.readdir(src, { withFileTypes: true });
    for (const el of source) {
      const srcPath = path.join(src, el.name);
      const distPath = path.join(dist, el.name);
      if (el.isDirectory()) {
        await copyDir(srcPath, distPath);
      } else if (el.isFile()) {
        await fs.copyFile(srcPath, distPath);
      }
    }
  } catch (err) {
    console.log('Ошибка копирования папок ', err);
  }
}

async function replaceTemplate() {
  try {
    await fs.mkdir(projectDistPath, { recursive: true });
    let template = fs.readFile(templateHtml, 'utf8');

    const files = await fs.readdir(componentsHtml, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() || path.extname(file.name) === '.html') {
        const fileName = file.name;
        const fileContent = await fs.readFile(
          path.join(componentsHtml, fileName),
          'utf8',
        );
        template = (await template).replace(
          `{{${fileName.slice(0, -5)}}}`,
          fileContent,
        );
      }
    }
    await fs.writeFile(distHtml, template, 'utf8');
  } catch (err) {
    console.log('Ошибка создания html ', err);
  }
}

mergeStyles();
copyDir(assetsSrcPath, assetsDistPath);
replaceTemplate();
