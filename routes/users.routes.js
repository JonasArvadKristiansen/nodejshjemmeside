const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/createuser', (req, res) => {
    res.render('createuser');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if(!((email && password))) {
        res.status(400).send("Input/inputs missing");
    }

    const response = users.loginUser(req, res);
    console.log(response)
    
});

router.post('/create', async (req, res, next) => {
    //setting varibles
    const {email, password, repeatPassword} = req.body;

    //checking if fields are empty
    if(!(email && password && repeatPassword)) {
        return res.status(400).send("Input/inputs missing");
    }

    //checking if passwords match
    if(password != repeatPassword) {
        return res.status(409).send("passwords not matching")
    }

    //checks if user exists
    const userExist = await users.userExist(email)
    
    if(userExist) {
        return res.status(409).send("User already exists")
    }

    //sends to next endpoint if all checks are cleared
    next()
    
});

router.post('/create', async (req, res) => {
    let result = await users.createUser(req, res);
    if(result) {
        res.render('login')
    } else {
        res.redirect('back');
    }
});

module.exports = router;