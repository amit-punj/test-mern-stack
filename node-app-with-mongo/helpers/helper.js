var jwt = require('jsonwebtoken');

exports.generateAccessToken = function (user) {
    return jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: '20d' });
}
