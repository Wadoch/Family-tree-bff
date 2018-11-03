const mongoose = require('mongoose');
const config = require('config');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('mongodb.url'), {useNewUrlParser: true})
    .catch((err) => console.log(err));

mongoose.connection.once('open', () => console.log(`Successfully connected to database: ${config.get('mongodb.url')}`));

module.exports = mongoose;