const express = require('express');
const app = express();
const mysql = require('mysql2')
const bcrypt = require("bcrypt")


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs')

// use res.render to load up an ejs view file

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejsloginsystem'
});

con.connect(function(err) {
    if(err) throw(err);
	console.log("Connected!");
});

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/createuser', (req, res) => {
    res.render('createuser')
});

app.post('/login', (req, res) => {
    let email = req.body.emailInput
    let password = req.body.passwordInput

    //select * from database mathing the parameter 
    con.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
        if(data.length != 0)
        {
            // tjekking if typed password match hashed password from database
            let passwordhashed = bcrypt.compareSync(password, data[0].userpassword)

            //pwCheck return true if they match
            if(passwordhashed)
            {
                res.render('index');
            } else {
                res.render('login');
            }
        } else {
            res.render('login');
        }

    });
});

app.post('/create', (req, res) => {
    let email = req.body.emailInput
    let password = req.body.passwordInput
    let repeatPassword = req.body.repeatPasswordInput

    con.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
        if(data.length == 0)
        {
            if(password == repeatPassword)
            {
                //hashing password user typed
                let hashPassword = bcrypt.hashSync(password, 10);

                // inserting user into database
                con.query("INSERT INTO users (email, userpassword) VALUES (?, ?)", [
                    email, hashPassword
                ]);
                res.render('login')
            } else {
                console.log("Not a match")
            }
        } else {
            console.log(err)
            res.render('createuser')
        }
    });
});

app.listen(3000, () => {
   
   console.log("app is running on port 3000")
});
