const path = require('path');
const fs = require('fs');

const routesPath = path.join(__dirname, '/routes/');
let routes = [];

fs.readdirSync(routesPath).forEach((fileName) => {
    const file = require(`./routes/${fileName}`);
    routes = routes.concat(file);
});

module.exports = routes;