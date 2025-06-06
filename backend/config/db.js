// backend/config/db.js

// Usando o wrapper de Promises do mysql2
const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Inicializando configuração do banco de dados...');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
    // Configuração de segurança essencial para o Render
    ssl: {
        // Render usa certificados válidos, então podemos e devemos verificar.
        rejectUnauthorized: true
    },
    
    // Configurações para tornar o pool de conexões robusto
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000 // 20 segundos
};

// Crie o pool de conexões. createPool já retorna um objeto com métodos baseados em Promises.
const pool = mysql.createPool(dbConfig);

// Função assíncrona para testar a conexão na inicialização
async function testDbConnection() {
    try {
        // Pega uma conexão do pool e a libera automaticamente
        const connection = await pool.getConnection();
        console.log('Conectado ao banco de dados MySQL com sucesso (via Pool).');
        connection.release(); // Sempre libere a conexão de volta para o pool
    } catch (err) {
        console.error('ERRO FATAL ao conectar ao banco de dados MySQL:', err.message);
        // Em caso de erro na inicialização, encerra a aplicação para evitar comportamento inesperado.
        // O Render/serviço de hospedagem irá tentar reiniciar o processo.
        process.exit(1);
    }
}

// Executa o teste de conexão
testDbConnection();

// Exporte o pool de conexões para ser usado em outras partes da aplicação
module.exports = pool;
