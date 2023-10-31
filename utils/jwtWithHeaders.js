const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function createJWT(email, res) {
    const accessToken = jsonwebtoken.sign(
        { email: email },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 * 60 }
    );
    if (accessToken) {
        return res.status(200).json(accessToken);
    } else {
        return res.status(500).json('Token failed to be created');
    }
}

function authToken(req, res) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        // Extract and verify token
        const token = authHeader.split(' ')[1]; // Remove 'Bearer' prefix
        jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            return res.status(200).json(user);
        });
    } else {
        return res.status(401).send('Unauthorized');
    }
}

function tjekIfLogging(req) {
    return new Promise((resolve, reject) => {
        const token2 = req.cookies.Authorization;

    if (token2 == null) {
        resolve(false)
    }

    jsonwebtoken.verify(token2, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            reject(err)
        } 
        
        resolve(true)
    });    
    })
}

module.exports = {
    authToken,
    createJWT,
    tjekIfLogging,
};
