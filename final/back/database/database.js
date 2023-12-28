import mysql  from 'mysql2';

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'if_pam_final'
  });

export default database.promise();