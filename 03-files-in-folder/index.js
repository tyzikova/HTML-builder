const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, items) => {
  if (err) process.stdout.write(chalk.red(err));
  for (let i = 0; i < items.length; i++){
    const file = path.join(folder, items[i].name);

    fs.stat(file, (err, stats) => {
      if (err) process.stdout.write(chalk.red(err));
      if (stats.isFile()) {
        process.stdout.write(chalk.green(`${items[i].name.split('.')[0]}`)
                + ' ' 
                + '-'
                + ' ' 
                + `${path.extname(items[i].name).slice(1)}` 
                + ' '
                + '-' 
                + ' '
                + chalk.blue(`${(stats.size * 0.001)}`) 
                + ' '
                + 'kb\n');
      }
    });
  }
});