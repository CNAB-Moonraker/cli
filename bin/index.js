#!/usr/bin/env node

const chalk = require('chalk');
const didYouMean = require('didyoumean');
const program = require('commander');
const { logo, runServer } = require('../utils');

program
  .name('moonraker')
  .version(require('../package.json').version)
  .usage('command')

program
  .command('run')
  .option('-p, --port <port>', 'Optional Port Parameter - Defaults to 3002')
  .action(runServer)


// Handle unknown command
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

program.parse(process.argv)

// Output help command if no command given
if (!process.argv.slice(2).length) {
  logo()
  program.outputHelp()
}

function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd._name)

  const suggestion = didYouMean(unknownCommand, availableCommands)
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}
