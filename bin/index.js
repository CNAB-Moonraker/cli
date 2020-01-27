#!/usr/bin/env node

const chalk = require('chalk');
const didYouMean = require('didyoumean');
const program = require('commander');
const { logo, runServer, funMessage, setupFrontend } = require('../utils');


program
  .name('moonraker')
  .version('0.0.0')
  .usage('command')

program
  .command('run')
  .option('-p, --port <port>', 'Optional Port Parameter - Defaults to 3002')
  .action(runServer)

//program command setup
program
  .command('setup')
  .option('-l, --filepath <filepath>', 'Define the local filepath to show local visualization')
  //this option not working yet, but is for future use once we integrate the cloud bundle
  //FIX ME:
  //.option('.c', 'Get your visualization from bundles installed across multiple devices (cloud)')
  .action(setupFrontend)

//for fun :)
program
  .command('arrg')
  .action(funMessage)

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
