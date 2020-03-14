const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const path = require('path')
const { promisify } = require('util')
const { getClaims } = require('../../utils/claims');


router.get('/', async function (req, res, next) {
    const response = await getClaims();
    res.json(response);
});

router.get('/v2', async (req, res, next) => {
    
});

module.exports = router;
