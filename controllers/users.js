const bcrypt = require('bcrypt');
const db = require('../utils/mysql');

const loginUser = (req) => {
    let email = req.body.email;
    let password = req.body.password;

    //had to wrap in a promise in order to return true or false. If i did not it returned before value was resolved
    return new Promise((resolve, reject) => {
        //select * from database mathing the parameter
        db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
            if (err) {
                //reject the promise if error
                reject(err);
            } else if (data.length > 0) {
                // tjekking if typed password match hashed password from database
                let passwordhashed = bcrypt.compareSync(
                    password,
                    data[0].userpassword
                );

                //pwCheck return true if they match
                if (passwordhashed) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    });
};

//had to wrap in a promise in order to return true or false. If i did not it returned before value was resolved
const userExist = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', email, (err, data) => {
            if (err) {
                //reject the promise if error
                reject(err);
            } else {
                //resolve with true or false based on the query result
                resolve(data.length > 0);
            }
        });
    });
};

const createUser = (req) => {
    const { email, password } = req.body;

    //hashing password user typed
    const hashPassword = bcrypt.hashSync(password, 10);
    //had to wrap in a promise in order to return true or false. If i did not it returned before value was resolved
    return new Promise((resolve, reject) => {
        db.execute(
            'INSERT INTO users (email, userpassword) VALUES (?, ?)',
            [email, hashPassword],
            (err, data) => {
                if (err) {
                    //reject the promise if error
                    reject(err);
                } else {
                    resolve(data.affectedRows > 0);
                }
            }
        );
    });
};

module.exports = {
    userExist,
    createUser,
    loginUser,
};
