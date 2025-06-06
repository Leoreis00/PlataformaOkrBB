// backend/config/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Inicializando configuração do banco de dados...');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
    // NÃO vamos forçar SSL, pois o servidor não suporta.
    // A remoção do bloco 'ssl' é a correção principal aqui.
    
    // Configurações para tornar o pool de conexões robusto
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000 // 20 segundos
};

// Crie o pool de conexões com a configuração correta
const pool = mysql.createPool(dbConfig);

// Função assíncrona para testar a conexão na inicialização
async function testDbConnection() {
    let connection;
    try {
        // Tenta obter uma conexão do pool
        connection = await pool.getConnection();
        console.log('Conectado ao banco de dados MySQL com sucesso (via Pool).');
    } catch (err) {
        console.error('ERRO FATAL ao conectar ao banco de dados MySQL:', err.message);
        // Encerra a aplicação se não conseguir conectar na inicialização
        process.exit(1);
    } finally {
        // Garante que a conexão seja liberada de volta para o pool
        if (connection) {
            connection.release();
        }
    }
}

// Executa o teste de conexão
testDbConnection();

// Exporte o pool de conexões para ser usado no resto da aplicação
module.exports = pool;
