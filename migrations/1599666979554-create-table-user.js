const {config, mysqlm} = require('./.common.js');

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE \`user\`(
      id INT PRIMARY KEY AUTO_INCREMENT,
      
      name VARCHAR(255),
      email VARCHAR(255),
      birthDate TIMESTAMP NULL DEFAULT NULL,
      address_id INT,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      FOREIGN KEY(address_id) REFERENCES address(id)
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);
  await query(`DROP TABLE \`user\``);
}

module.exports = { up, down }