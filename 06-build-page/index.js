const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const assets = path.join(__dirname, 'assets');
const projectDirectory = path.join(__dirname, 'project-dist');
const projectAssets = path.join(projectDirectory, 'assets');

const htmlFile = path.join(projectDirectory, 'index.html');
const templateFile = path.join(__dirname, 'template.html');
const componentsFile = path.join(__dirname, 'components');

/*создаем папку project-dist и копируем в нее папку assets*/

async function copyAssets(ass, proj){
  await fsPromises.mkdir(proj, {recursive: true});
  const items = await fsPromises.readdir(ass, {withFileTypes: true}, (err) => {
    if(err) process.stdout.write(err);
  });
  for (let i = 0; i < items.length; i++){
    const from = path.join(ass, items[i].name);
    const to = path.join(proj, items[i].name);
    if(items[i].isDirectory()){
      copyAssets(from, to);
    }else{
      fsPromises.copyFile(from, to);
    }
  }
}
copyAssets(assets, projectAssets);

/*собираем css и копируем общий файл в project-dist*/

async function bilderCss(proj){
  await fsPromises.mkdir(proj, {recursive: true});
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  const styles = path.join(__dirname, 'styles');
  
  fs.readdir(styles, {withFileTypes: true}, (err, items) => {
    if (err) process.stdout.write(err);

    for (let i = 0; i < items.length; i++){
      if (items[i].name.includes('.css')){
        const input = fs.createReadStream(path.join(styles, items[i].name), 'utf-8');
        input.pipe(output);
      }
    }
  });
}
bilderCss(projectDirectory);


/*создаем html и копируем в него данные из template с заменой тегов*/ 

fs.mkdir(projectDirectory, { recursive: true }, (err) => {
  if (err) throw err;
});

const indexHtml = fs.createWriteStream(path.join(htmlFile));
const templateHtml = fs.createReadStream(path.join(templateFile), 'utf-8');

templateHtml.on('data', (data) => {
  let html = data.toString();
  const tags = html.match(/{{(.*)}}/gi);
  Promise.all(tags.map(async (item) => {
    const tagsName = item.substr(2, (item.length-4));
    const component = await fsPromises.readFile(path.join(componentsFile, `${tagsName}.html`));
    return html = html.replace(item, component.toString());   
  })).then(() => indexHtml.write(html));
});

