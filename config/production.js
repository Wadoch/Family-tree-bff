module.exports = {
    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 8000,
    },
    mongodb: {
        url: process.env.MONGODB_DATABASE,
    }
};