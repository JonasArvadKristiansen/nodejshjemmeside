const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function createJWT(req, res) {
    const accessToken = jsonwebtoken.sign(
        { email: req.email },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 * 60 }
    );
    res.cookie('authorization', accessToken, { httpOnly: true, maxAge: 3600000*2 });
    return true;
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        console.log(user);

        next();
    });
}

module.exports = {
    authToken,
    createJWT,
};
