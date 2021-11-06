const fs = require('fs');
const path = require('path');

async function bilder(){
  const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
  const style = path.resolve(__dirname, 'styles');
  
  fs.readdir(style, {withFileTypes: true}, (err, style) => {
    if (err) process.stdout.write(err);

    for (let i = 0; i < style.length; i++){
      if (style[i].name.includes('.css')){
        const input = fs.createReadStream(path.resolve(__dirname, 'styles', style[i].name), 'utf-8');
        input.pipe(bundle);
      }
    }
  });
}
bilder();


/*solution with promises mothod*/

// const fsPromises = require('fs/promises');
// const fs = require('fs');
// const path = require('path');

// async function bilder(){
//   const folderCss = path.join(__dirname, 'styles');
//   const files = await fsPromises.readdir(folderCss, {withFileTypes: true});
//   const bundleOutPut = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

//   for (let i = 0; i < files.length; i++){
//     if (files[i].name.includes('.css')){
//       const input = fs.createReadStream(path.join(__dirname, 'styles', files[i].name), 'utf-8');
//       input.pipe(bundleOutPut);
//     }
//   }
// }
// bilder();