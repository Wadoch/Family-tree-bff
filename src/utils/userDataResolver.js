const crypto = require('crypto');
const config = require('config');
const { get } = require('lodash');

const encryptData = (data, { hashType, key, iv, outputEncoding, inputEncoding }) => {
    const cipher = crypto.createCipheriv(hashType, key, iv);

    return (cipher.update(data, outputEncoding, inputEncoding) + cipher.final(inputEncoding));
};

const decryptData = (data, { hashType, key, iv, outputEncoding, inputEncoding }) => {
    const decipher = crypto.createDecipheriv(hashType, key, iv);

    return (decipher.update(data, inputEncoding, outputEncoding) + decipher.final(outputEncoding));
};

const decryptUserData = (data) => {
    return decryptData(data, get(config, 'decryptUserData'));
};

module.exports.decryptUserData = decryptUserData;