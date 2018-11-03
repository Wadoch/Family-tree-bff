const heroin = require('heroin-js');

const configurator = heroin(process.env.HEROKU_API_TOKEN);

const copyEnvs = [
    'MONGODB_DATABASE',
    'JWT_SECRET_KEY',
];

const baseEnvs = copyEnvs.reduce((all, current) =>
    ({ ...all, [current]: process.env[current] }), {});

const config = {
    name: 'ps-family-tree-bff',
    config_vars: {
        ...baseEnvs,
    },
};

configurator(config);