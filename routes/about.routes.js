const express = require('express');
const router = express.Router();
const about = require('../controllers/about');
const jwtH = require('../utils/jwtWithHeaders');
const jwtC = require('../utils/jwtWithCookies');

router.get('/about', async (req, res) => {
    res.render('about');
});

router.get('/aboutCookie', jwtC.authToken, async (req, res) => {
    about.testing;
    res.render('about');
});

router.get('/aboutHeaders', jwtH.authToken);

module.exports = router;
