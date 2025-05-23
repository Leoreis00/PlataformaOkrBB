

require('dotenv').config();            // Carrega variáveis de ambiente do .env
const express = require('express');
const cors = require('cors');

const okrRoutes = require('./routes/okrRoutes');
const metaRoutes = require('./routes/metaRoutes');

const app = express();

// Middlewares
app.use(cors());                       // Permite requisições de outros domínios (ex: frontend React)
app.use(express.json());               // Permite receber JSON no body das requisições

// Rotas
app.use('/api/okrs', okrRoutes);
app.use('/api/metas', metaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
