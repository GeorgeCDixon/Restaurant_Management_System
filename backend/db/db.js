const url = 'http://georgecd:123456@127.0.0.1:5984';
const nano = require('nano')(url);


const database = nano.db.use('restaurant_db');

module.exports = database;