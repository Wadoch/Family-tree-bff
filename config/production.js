module.exports = {
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 8000,
    },
    mongodb: {
        url: process.env.MONGODB_DATABASE,
    },
    decryptUserData: {
        key: process.env.DECRYPT_USER_DATA_KEY,
        iv: process.env.DECRYPT_USER_DATA_IV,
        salt: process.env.DECRYPT_USER_DATA_SALT,
    },
};