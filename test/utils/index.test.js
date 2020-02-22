const assert = require('assert');
const util = require('util');
const {describe, it} = require('mocha');

const chalk = require('chalk');
const sinon = require('sinon');

const indexUtils = require('../../utils/index');

const expectedLogo = chalk`
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
`;

/**
 * Test suite for utils/index.js
 */
describe('Test suite for utils/index.js', () => {

    it('Verify console.log() output for logo', () => {

        let messages = [];
        sinon.stub(console, "log").callsFake((...args) => {
            // Format the console message with any optional params to create a single
            // log message.
            const params = Array.prototype.slice.call(args, 1);
            const message = params.length
                ? util.format(args[0], ...params)
                : args[0];
            messages.push(message);
        });

        indexUtils.outputLogo();
        assert.equal(messages[0], expectedLogo);
        console.log.restore();
    });
});
