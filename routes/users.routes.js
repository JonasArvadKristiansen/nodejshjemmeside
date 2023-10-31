const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
//const jwtWithHeaders = require('../utils/jwtWithHeaders');
const jwtWithCookies = require('../utils/jwtWithCookies');

router.get('/login', async (req, res) => {
    let loginTjek = await jwtWithCookies.tjekIfLogging(req)
    //let loginTjek = await jwtWithHeaders.tjekIfLogging(req)

    if(loginTjek) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/create', (req, res) => {
    res.render('createuser');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send('Input/inputs missing');
    }

    const response = await users.loginUser(req, res);
    if (response) {
        //jwtWithHeaders.createJWT(email, res);
        jwtWithCookies.createJWT(email, res);
    } else {
        return res.status(404).json('User not found');
    }
});

router.post('/create', async (req, res, next) => {
    //setting varibles
    const { email, password, repeatPassword } = req.body;

    //checking if fields are empty
    if (!(email && password && repeatPassword)) {
        return res.status(400).json('Input/inputs missing');
    }

    //checking if passwords match
    if (password != repeatPassword) {
        return res.status(409).json('Passwords not matching');
    }

    //checks if user exists
    const userExist = await users.userExist(email);

    if (userExist) {
        return res.status(409).json('User already exists');
    }

    //sends to next endpoint if all checks are cleared
    next();
});

router.post('/create', async (req, res) => {
    let result = await users.createUser(req, res);
    if (result) {
        return res.status(200).json('User created');
    } else {
        return res.status(400).json('Denied creating user');
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('Authorization')
    res.status(200).json("User is logged out")
});

module.exports = router;
