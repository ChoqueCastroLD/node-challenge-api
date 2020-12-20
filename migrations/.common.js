const dotenv = require('dotenv');
dotenv.load();

const mysqlm = require('mysqlm');
const fs = require('fs');
const path = require('path');

let config = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

if(process.env.SSL_CA_PATH) {
    config.ssl.ca = fs.readFileSync(path.join(__dirname, process.env.SSL_CA_PATH));
}
if(process.env.SSL_CA_PATH) {
    config.ssl.key = fs.readFileSync(path.join(__dirname, process.env.SSL_KEY_PATH));
}
if(process.env.SSL_CA_PATH) {
    config.ssl.cert = fs.readFileSync(path.join(__dirname, process.env.SSL_CERT_PATH));
}

module.exports = {config, mysqlm}