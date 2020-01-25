#!/usr/bin/env node

const chalk = require('chalk');
const moonraker = require('commander');

moonraker
  .command('hello')
  .option('-n, --name <name>', 'Pass a variable to the CLI.')
  .action((name="from my CLI") => {
    console.log(chalk.cyan(`Hello ${name}!`));
  })
  

moonraker.parse(process.argv)
