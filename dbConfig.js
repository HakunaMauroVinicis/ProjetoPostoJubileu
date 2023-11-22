// dbConfig.js
const mysql = require('mysql');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'My7Pass@Word_9_8A_zE',
    database: 'AulaSale'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.stack)
    }
    console.log('Conectado ao MySQL -- com id:' + db.threadId);
});

module.exports = db;
