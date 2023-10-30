const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function createJWT(email, res) {
    const accessToken = jsonwebtoken.sign(
        { email: email },
        process.env.TOKEN_SECRET,
        { expiresIn: 60 * 60 }
    );
    res.cookie('Authorization', accessToken, {
        maxAge: 3600000 * 2,
    });

    return res.status(200).json("Login approved")
}

function authToken(req, res, next) {
    const token2 = req.cookies.Authorization;

    if (token2 == null) {
        return res.sendStatus(401);
    }

    jsonwebtoken.verify(token2, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user);
        next();
    });
}

module.exports = {
    authToken,
    createJWT,
};
