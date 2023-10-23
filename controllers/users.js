const bcrypt = require('bcrypt');
const db = require('../utils/mysql');
const jwttokensign = require('../utils/jwt');

const loginUser = async (req, res) => {
    let email =  req.body.email;
    let password = req.body.password;

    //select * from database mathing the parameter
    db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
        console.log("1")
        if (typeof data != 'undefined') {
            if (data.length > 0) {
                // tjekking if typed password match hashed password from database
                let passwordhashed = bcrypt.compareSync(
                    password,
                    data[0].userpassword
                );

                //pwCheck return true if they match
                if (passwordhashed) {
                    let jwt = jwttokensign.createJWT(email);
                    return jwt
                    //res.render('index');
                } else {
                    res.render('login');
                }
            }
        } else {
            res.render('login');
        }
    });
};

const userExist = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
            if(err) {
                //reject the promise if error
                reject(err)
            } else {
                //resolve with true or false based on the query result
                resolve(data.length > 0)
            }
        });
    });
};

const createUser = async (req) => {
    const {email, password} = req.body

    //hashing password user typed
    const hashPassword = bcrypt.hashSync(password, 10);

    // inserting user into database
    return new Promise((resolve, reject) => {
        db.execute('INSERT INTO users (email, userpassword) VALUES (?, ?)', [email, hashPassword], (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data.affectedRows > 0)
            }
        });
    });
};

module.exports = {
    userExist,
    createUser,
    loginUser,
};
