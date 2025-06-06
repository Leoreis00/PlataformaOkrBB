// backend/config/db.js

// 1. Importa a biblioteca 'mysql2', que é a correta para MySQL.
const mysql = require('mysql2');
require('dotenv').config();

console.log('Inicializando configuração do banco de dados MySQL...');

// 2. Configura a conexão usando as variáveis de ambiente separadas.
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // Configurações para tornar o pool de conexões robusto
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000 // 20 segundos
};

// 3. Cria o pool de conexões com a configuração correta
const pool = mysql.createPool(dbConfig);

// 4. Testa a conexão na inicialização para garantir que tudo está certo.
pool.getConnection((err, connection) => {
    if (err) {
        console.error('ERRO FATAL ao conectar ao banco de dados MySQL:', err);
        // Encerra a aplicação se a conexão inicial falhar
        process.exit(1); 
    } else {
        console.log('Conectado ao banco de dados MySQL com sucesso.');
        // Libera a conexão de volta para o pool
        connection.release();
    }
});

// 5. Exporta o pool para ser usado pelos seus outros arquivos (models, etc.)
module.exports = pool;
