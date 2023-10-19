//requiring in mongoose
const { connect, connection } = require('mongoose');
//making a connnection to the database
connect('mongodb://127.0.0.1:27017/socialNetwork');

module.exports = connection;
