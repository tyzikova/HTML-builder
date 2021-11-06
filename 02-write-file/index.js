const fs = require('fs');
const path = require('path');
const process = require('process');

const stdout = process.stdout;
const chalk = require('chalk');
const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let stream;

stdout.write(chalk.green('Enter any text, please... \n'));

rl.on('line', (line) =>{
  if (line !== 'exit' && !stream){
    stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
  }
  createFile(line);
});

process.on('beforeExit', () => sayLastWord());


function sayLastWord(){
  stdout.write(chalk.red('Best of luck to You!\n'));
}

function createFile(str){
  if (str === 'exit'){
    sayLastWord();
    process.exit();
  }
  stream.write(`${str} \n`);
  fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
}