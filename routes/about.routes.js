const express = require('express');
const router = express.Router();
const about = require('../controllers/about')
const {authToken} = require('../utils/jwt')

router.get('/about', authToken, async (req, res) => {
    about.testing()
    res.render('about');
});

module.exports = router;
