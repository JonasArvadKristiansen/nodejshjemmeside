const bcrypt = require('bcrypt');
const db = require('../utils/mysql')

const loginUser = ((req, res) => {
    let email = req.body.emailInput;
    let password = req.body.passwordInput;

    //select * from database mathing the parameter
    db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
        if (typeof(data) != "undefined" ) {
            if(data.length > 0)
            {
                // tjekking if typed password match hashed password from database
            let passwordhashed = bcrypt.compareSync(
                password,
                data[0].userpassword
            );

            //pwCheck return true if they match
            if (passwordhashed) {
                res.render('index');
            } else {
                res.render('login');
            }
            }
        } else {
            res.render('login');
        }
    });
});

const createUser = ((req, res) => {
    let email = req.body.emailInput;
    let password = req.body.passwordInput;
    let repeatPassword = req.body.repeatPasswordInput;

    db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
        if (typeof(data) != "undefined" ) {
        if (data.length == 0) {
            if (password == repeatPassword) {
                //hashing password user typed
                let hashPassword = bcrypt.hashSync(password, 10);

                // inserting user into database
                db.query('INSERT INTO users (email, userpassword) VALUES (?, ?)',[email, hashPassword]);
                res.render('login');
            } else {
                console.log('Not a match');
            }
        } else {
            console.log("user already exist");
            res.render('createuser');
        }
        }
    });
});

module.exports = {
    createUser, 
    loginUser
}