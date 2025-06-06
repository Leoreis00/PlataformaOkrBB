// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Configurações para o pool de conexões:
  waitForConnections: true, // Se não houver conexões disponíveis, espera
  connectionLimit: 10,     // Número máximo de conexões no pool
  queueLimit: 0            // Número máximo de requisições pendentes na fila
};

// Crie o pool de conexões
const pool = mysql.createPool(dbConfig);

// Opcional: Adicionar listeners para monitorar o pool e a conexão
pool.on('connection', (connection) => {
    console.log('Nova conexão MySQL obtida do pool.');
});

pool.on('error', (err) => {
    console.error('Erro no pool de conexões MySQL:', err.code, err.message);
    // Este evento pode indicar um erro fatal no pool; o Render pode reiniciar o serviço.
});

// Testar a conexão inicial do pool
// Isso garante que as credenciais estão corretas e o DB está acessível na inicialização
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro fatal ao conectar ao banco de dados MySQL no pool:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.warn('Conexão MySQL perdida durante o teste inicial do pool. O pool tentará restabelecer automaticamente.');
        } else {
            // Outro tipo de erro, como credenciais incorretas ou host inacessível.
            // Considerar encerrar o processo para evitar mais erros.
            process.exit(1);
        }
    } else {
        console.log('Conectado ao banco de dados MySQL (via Pool).');
        connection.release(); // Libera a conexão de volta para o pool imediatamente
    }
});

module.exports = pool; // Exporte o pool de conexões