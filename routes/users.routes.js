const express = require('express')
const router = express.Router()
const users = require('../controllers/users')

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/createuser', (req, res) => {
    res.render('createuser');
});

router.post('/login', (req, res) => {
    users.loginUser(req, res);
});

router.post('/create', (req, res) => {
    users.createUser(req, res)
});

module.exports = router;