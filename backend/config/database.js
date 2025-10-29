const mysql = require('mysql2');
require('dotenv').config();

// Configuração para o Aiven MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

console.log('Tentando conectar ao MySQL Aiven:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('❌ ERRO ao conectar com o MySQL Aiven:', err.message);
    console.error('Código do erro:', err.code);
    console.error('Número do erro:', err.errno);
    return;
  }
  console.log('✅ Conectado ao MySQL Aiven com sucesso!');
});

// Tratamento de erros global
connection.on('error', (err) => {
  console.error('❌ Erro na conexão MySQL:', err);
});

module.exports = connection;