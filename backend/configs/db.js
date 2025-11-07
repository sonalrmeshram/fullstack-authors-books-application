const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'database-1.ckn4c840kn2f.us-east-1.rds.amazonaws.com',
   port: '3306',
   user: 'admin',
   password: 'Sonal45815',
   database: 'react_node_app'
});

module.exports = db;
