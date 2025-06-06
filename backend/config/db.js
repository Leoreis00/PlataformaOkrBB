// backend/config/db.js

// 1. Importa a biblioteca 'pg' para PostgreSQL.
// Certifique-se de ter rodado: npm install pg
const { Pool } = require('pg');
require('dotenv').config();

console.log('Inicializando configuração do banco de dados (Supabase)...');

// 2. Cria o pool de conexões usando a Connection String.
// A biblioteca 'pg' usa a connection string diretamente,
// que você deve configurar na variável de ambiente DB_CONNECTION_STRING no Render.
const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    // Supabase exige uma conexão segura (SSL).
    // Esta configuração é a mais comum e robusta para evitar problemas.
    ssl: {
        rejectUnauthorized: false
    }
});

// 3. Testa a conexão assim que a aplicação inicia.
// Se a conexão falhar, a aplicação será encerrada para evitar erros.
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('ERRO FATAL ao conectar ao banco de dados Supabase:', err);
        process.exit(1);
    } else {
        console.log('Conectado ao banco de dados Supabase com sucesso.');
    }
});

// 4. Exporta o pool para ser usado nos seus models e controllers.
module.exports = pool;
