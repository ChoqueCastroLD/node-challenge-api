const {config, mysqlm} = require('./.common.js');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`CREATE TABLE address(
    id INT PRIMARY KEY AUTO_INCREMENT,

    street VARCHAR(255),
    state VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    zip VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );`);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`DROP TABLE address;`);
}

module.exports = { up, down }