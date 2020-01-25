const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);
let porter = {};

//TODO: Get docker cnabs
//TODO: Get duffle cnabs
//TODO: Get porter claims

const porterDir = path.resolve(os.homedir(), '.porter/claims')

fs.readdir(porterDir, (err, data) => {
    if (err) throw err;
    data.forEach(async file => {
        let bundleName = path.basename(file, '.json');
        let fullFile = path.resolve(porterDir, file)
        let contents = await readFile(fullFile)
        porter[bundleName] = JSON.parse(contents.toString())
    });
});

fs.watch(porterDir, async (event, file) => {
    bundleName = path.basename(file, '.json');
    const fullFile = path.resolve(porterDir, file)
    if (fs.existsSync(fullFile)) {
        contents = await readFile(fullFile)
        porter[bundleName] = JSON.parse(contents.toString())
    }
    else {
        delete porter[bundleName]
    }
})

router.use(express.static('public'));
router.get('/', function (req, res, next) {
    res.json(porter);
});

module.exports = router;
