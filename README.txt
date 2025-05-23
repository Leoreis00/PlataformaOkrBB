
Plataforma Interna de OKRs - Banco do Brasil
============================================

Uma plataforma interna intuitiva que centraliza o cadastro, visualização e análise de OKRs, com dashboards interativos.
Desenvolvido para o Banco do Brasil como parte da Residência Porto Digital, dentro do projeto Embarque Digital da Faculdade UNINASSAU.

------------------------------------------------------------

Como Executar o Projeto
-----------------------

Pré-requisitos:
- Node.js (v16 ou superior)
- MySQL
- npm

Backend
-------

1. Navegue até a pasta do backend:

    cd backend

2. Instale as dependências:

    npm install

3. Configure as variáveis de ambiente criando um arquivo .env com:

    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=plataforma_okr
    DB_HOST=localhost
    DB_PORT=3306

4. Configure o banco de dados MySQL:

- Crie o banco de dados:

    CREATE DATABASE `plataforma_okr`;

- Crie a tabela `okrs`:

    CREATE TABLE `okrs` (
      `id` int NOT NULL AUTO_INCREMENT,
      `objetivo` varchar(255) NOT NULL,
      `resultado_chave` varchar(255) NOT NULL,
      `area_responsavel` varchar(100) NOT NULL,
      `periodo` varchar(10) NOT NULL,
      `tipo` enum('Resultado','Esforço') NOT NULL,
      `status` enum('Planejamento','Em andamento','Concluído') DEFAULT 'Planejamento',
      `descricao` text,
      `progresso` int DEFAULT '0',
      `impacto_financeiro` decimal(12,2) DEFAULT '0.00',
      `trimestre` varchar(10) DEFAULT NULL,
      `peso_kpi` int DEFAULT '0',
      PRIMARY KEY (`id`)
    );

5. Inicie o servidor:

    node server.js

O backend estará rodando em: http://localhost:3000 (confira sua porta)

Frontend
--------

1. Navegue até a pasta do frontend:

    cd frontend

2. Instale as dependências:

    npm install

3. Configure as variáveis de ambiente criando um arquivo .env com:

    VITE_API_URL=http://localhost:3000 (confira sua porta)

4. Inicie o servidor de desenvolvimento:

    npm run dev

O frontend estará rodando em: http://localhost:5173

------------------------------------------------------------

Observações importantes
----------------------

- O backend deve estar rodando antes de iniciar o frontend.
- Arquivos .env devem ser criados nas pastas backend e frontend.

Sobre o Projeto
---------------

Este projeto visa facilitar o gerenciamento estratégico de OKRs no Banco do Brasil, oferecendo uma ferramenta robusta para cadastro, acompanhamento e análise, com foco em usabilidade e clareza visual.



Licença
-------

Este projeto é de uso exclusivo educacional e interno, desenvolvido no contexto da Residência Porto Digital.
