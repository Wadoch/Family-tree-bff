const crypto = require('crypto-js');
const config = require('config');
const bcrypt = require('bcrypt');

const decryptData = (data, hashKey) => {
    const bytes  = crypto.AES.decrypt(data, hashKey);

    return bytes.toString(crypto.enc.Utf8);
};

module.exports.decryptAuthPassword = (password) => decryptData(password, config.get('decryptUserData.key'));
module.exports.hashPassword = (password) => (bcrypt.hashSync(password, 10));

