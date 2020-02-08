const chalk = require('chalk');
const runExpress = require('./run');
const doSetup = require('./setup');

exports.runServer = (cmd) => {
  const port = cmd.port ? cmd.port : false;
  // console.log(chalk.cyan('Running the server...'));
  // console.log(chalk.green(`Port ${port?'provided: ' + port: 'not provided'}`))
  runExpress(port?port:undefined);
}

exports.funMessage = (cmd) => {
  console.log(chalk.red('Ahoy, matey! Welcome aboard.'))
}

exports.setupFrontend = (cmd) => {
  // const filePath = cmd.filepath ? cmd.filepath : false;
  // console.log(`Setting up your visualization${filePath? ' for ' + filePath + '...': '...'}`)
  //pull the front-end code from git
  //connect front-end with claims.json from local file path
  doSetup();
}

exports.logo = () => {
console.log(chalk`
{white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}     {blue *}     {white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}     {blue (((((((((((}     {white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@@@@(}     {blue (((((((((((((((((((((}     {white /@@@@@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@}      {blue (((((((((((((((((((((((((((((((}      {white @@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@}     {blue .(((((((((((((((((((((((((((((((((((((((((,}     {white @@@@@@@@@@@@@}
{white @@@@@@@@@}     {blue /(((((((((((((((((((((((((}    {blue (((((((((((((((((((((((}     {white @@@@@@@@}
{white @@@@@@@@}  {blue (((((((((((((((((((((((((((((*}        {blue *((((((((((((((((((((((}  {white @@@@@@@}
{white @@@@@@@}   {blue (((((((((((((((((((((((((((((,}            {blue (((((((((((((((((((}   {white @@@@@@}
{white @@@@@@@}  {blue ((((((((((((((((((((((((((((((.} {blue (((((((((((((((((((((((((((((((}  {white @@@@@@}
{white @@@@@@}   {blue ((((((((((((((((((((((((((}           {blue ((((((((((((((((((((((((((}   {white @@@@@}
{white @@@@@@}  {blue ((((((((((((((((((((((((((((}         {blue ((((((((((((((((((((((((((((}  {white @@@@@}
{white @@@@@}  {blue *((((((((((((((((((((((((((((/}       {blue /((((((((((((((((((((((((((((/}  {white @@@@}
{white @@@@*}  {blue ((((((((((((((((((((((((((((((((}  {blue (((((((((((((((((((((((((((((((((}  {white ,@@@}
{white @@@@}  {blue ((((((((((((((((((((}                            {blue (((((((((((((((((((((}  {white @@@}
{white @@@}   {blue ((((((((((((((((((}                             {blue ((((((((((((((((((((((}   {white @@}
{white @@@}  {blue (((((((((((((((((}                               {blue (((((((((((((((((((((((}  {white @@}
{white @@}   {blue ((((((((((((((((}                               {blue ((((((((((((((((((((((((}   {white @}
{white @@}  {blue ((((((((((((((((}              PROJECT           {blue (((((((((((((((((((((((((}  {white @}
{white @}  {blue /(((((((((((((((}              MOONRAKER          {blue (((((((((((((((((((((((((/} {white @}
{white @}   {blue (((((((((((((((}                                  {blue ((((((((((((((((((((((((}  {white @}
{white @@@}   {blue (((((((((((((}                                   {blue (((((((((((((((((((((}   {white @@}
{white @@@@@}   {blue ((((((((((((}                                   {blue ,(((((((((((((((((}   {white @@@@}
{white @@@@@@@}   {blue ((((((((((((}                                    {blue (((((((((((((}   {white @@@@@@}
{white @@@@@@@@@}   {blue (((((((((((((((((((((((((((}   {blue (((((((((((((((((((((((((((}   {white @@@@@@@@}
{white @@@@@@@@@@@}   {blue (((((((((((((((((((((((((}   {blue (((((((((((((((((((((((((}   {white @@@@@@@@@@}
{white @@@@@@@@@@@@@}   {blue (((((((((((((((((((((((}   {blue (((((((((((((((((((((((}   {white @@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@}   {blue (((((((((((((((((((((((((((((((((((((((((((((}   {white @@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@}   {blue (((((((((((((((((((((((((((((((((((((((((}   {white @@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@}   {blue (((((((((((((((((((((((((((((((((((((}   {white @@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@}   {blue /////////////////////////////////}   {white @@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@@}                                     {white @@@@@@@@@@@@@@@@@@@@@}
{white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
`)

}