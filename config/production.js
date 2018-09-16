module.exports = {
    server: {
        port: process.env.PORT || 8000,
    },
    mongodb: {
        url: process.env.MONGODB_DATABASE,
    }
};