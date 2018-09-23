const jwt = require('jsonwebtoken');
const config = require('config');

const createToken = ({userId, username}) => (
    jwt.sign({userId, username}, config.get('jwt.secretKey'), {algorithm: 'HS256', expiresIn: '1h'})
);

module.exports.createJWT = createToken;