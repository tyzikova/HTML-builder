const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const stdout = process.stdout;
let stream = fs.createReadStream(
  path.join(__dirname, 'text.txt'), 
  'utf-8');
stream.on('data', (data) =>
  stdout.write(chalk.green(data))
);