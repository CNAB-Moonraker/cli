const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);
let response = {};
let porterList = [];
let duffleList = [];

response['porter'] = {}
response['duffle'] = {}

const porterDir = path.resolve(os.homedir(), '.porter/claims')
const duffleDir = path.resolve(os.homedir(), '.duffle/claims')

// Read porter directory
fs.readdir(porterDir, (err, data) => {
    if (err) throw err;
    data.forEach(async file => {
        let fullFile = path.resolve(porterDir, file)
        let contents = await readFile(fullFile)
        porterList.push(JSON.parse(contents.toString()))
        response['porter'] = porterList
    });
});

fs.readdir(duffleDir, (err, data) => {
    if (err) throw err;
    data.forEach(async file => {
        let fullFile = path.resolve(duffleDir, file)
        let contents = await readFile(fullFile)
        duffleList.push(JSON.parse(contents.toString()))
        response['duffle'] = duffleList
    })
});

router.get('/', function (req, res, next) {
    res.json(response);
});

module.exports = router;
