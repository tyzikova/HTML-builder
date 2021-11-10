const fs = require('fs').promises;
const path = require('path');

async function copyDir(){
  const file = path.join(__dirname, 'files');
  const copyFolder = path.join(__dirname, 'files-copy');

  await fs.rmdir(copyFolder, { recursive: true });
  await fs.mkdir(copyFolder, { recursive: true });
  const items = await fs.readdir(file, {withFileTypes: true}, (err) => {
    if(err) process.stdout.write(err);
  });
  for (let i = 0; i < items.length; i++){
    const from = path.join(file, items[i].name);
    const to = path.join(copyFolder, items[i].name);
    if(!items[i].isDirectory()){
      fs.copyFile(from, to);
    }
  }
}
copyDir();

/*solution with promises mothod*/

// const fs = require('fs/promises');
// const path = require('path');

// async function copyDir(){
//   const file = path.join(__dirname, 'files');
//   const fileCopy = path.join(__dirname, 'files-copy');

//   fs.mkdir(fileCopy, {recursive: true});
//   const files = await fs.readdir(file, {withFileTypes: true});

//   for (let i = 0; i < files.length; i++){
//     if (files[i].isFile()){
//       const from = path.join(file, files[i].name);
//       const to = path.join(fileCopy, files[i].name);
//       fs.copyFile(from, to);
//     }
//   }
// }
// copyDir(); 
