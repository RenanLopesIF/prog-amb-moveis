import mysql  from 'mysql2';

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'if_prog_sist_corp'
  });

export default database.promise()