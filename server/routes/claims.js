const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);
let response = {};

response['porter'] = []
response['duffle'] = []
response['docker-app'] = []

const porterDir = path.resolve(os.homedir(), '.porter/claims')
const duffleDir = path.resolve(os.homedir(), '.duffle/claims')
const dockerappDir = path.resolve(os.homedir(), '.docker/app/installations/claims')

// Read porter directory
fs.readdir(porterDir, (err, data) => {
    if (err) {
        console.log("Porter claims not found.")
    }
    else {
        data.forEach(async file => {
            let fullFile = path.resolve(porterDir, file)
            let contents = await readFile(fullFile)
            response['porter'].push(JSON.parse(contents.toString()))
        });
    }
});

// Read duffle directory
fs.readdir(duffleDir, (err, data) => {
    if (err) {
        console.log("Duffle claims not found.")
    }
    else {
        data.forEach(async file => {
            let fullFile = path.resolve(duffleDir, file)
            let contents = await readFile(fullFile)
            response['duffle'].push(JSON.parse(contents.toString()))
        })
    }
});

// Read dockerapp directory
fs.readdir(dockerappDir, (err, data) => {
    if (err) {
        console.log("Docker-app claims not found.")
    } else {
        data.forEach(async file => {
            let fullFile = path.resolve(porterDir, file)
            let contents = await readFile(fullFile)
            response['docker-app'].push(JSON.parse(contents.toString()))
        })
    }
})

router.get('/', function (req, res, next) {
    res.json(response);
});

module.exports = router;
