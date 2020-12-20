const {config, mysqlm} = require('./.common.js');

// Dont use config.database here
const customConfig = {
  host: config.host,
  user: config.user,
  password: config.password
}

async function up () {
  const {query} = mysqlm.connect(customConfig);

  await query(`CREATE DATABASE \`${process.env.DB_DATABASE}\``);
}

async function down () {
  const {query} = mysqlm.connect(customConfig);

  await query(`DROP DATABASE \`${process.env.DB_DATABASE}\``);
}

module.exports = { up, down }