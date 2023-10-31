const express = require('express');
const router = express.Router();
const about = require('../controllers/about');
const jwtH = require('../utils/jwtWithHeaders');
const jwtC = require('../utils/jwtWithCookies');

router.get('/about', async (req, res) => {
    res.render('about');
});

router.get('/aboutCookie', jwtC.authToken, async (req, res) => {
    //just to test if auth is working
    about.testing;
    res.render('about');
});

//a test with req.headers instead of with req.cookies
router.get('/aboutHeaders', jwtH.authToken);

module.exports = router;