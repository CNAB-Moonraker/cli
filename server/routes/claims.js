const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path')
const { promisify } = require('util')

const { getClaims } = process.env.USE_AZURE === 'true' ? require('../../utils/remoteClaims') : require('../../utils/claims');


router.get('/', async function (req, res, next) {
    try {
        const response = await getClaims();
        res.json(response);
        
    } catch (error) {
        console.error(error)
        res.status(500).send('Server could not access claims')
    }
});

module.exports = router;
