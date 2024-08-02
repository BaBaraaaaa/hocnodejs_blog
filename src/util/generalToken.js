const jwt = require('jsonwebtoken');

module.exports = {
    generalAccessToken: function (data) {
        return jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
    },
    generalRefreshToken: function (data) {
        return jwt.sign({data}, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1y' });
    }
}