// backend/models/okrModel.js
const db = require('../config/db');

// Usamos a versão com Promise do pool para usar async/await
const promisePool = db.promise();

const Okr = {};

// --- CRUD ---
Okr.create = async (okrData) => {
    const sql = `INSERT INTO okrs (objetivo, resultado_chave, area_responsavel, periodo, tipo, status, descricao, progresso, impacto_financeiro, trimestre, peso_kpi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        okrData.objetivo, okrData.resultado_chave, okrData.area_responsavel, okrData.periodo, 
        okrData.tipo, okrData.status, okrData.descricao, okrData.progresso, 
        okrData.impacto_financeiro, okrData.trimestre, okrData.peso_kpi
    ];
    const [result] = await promisePool.query(sql, values);
    return { id: result.insertId, ...okrData };
};

Okr.getAll = async (trimestre, departamento) => {
    let query = "SELECT * FROM okrs WHERE 1=1";
    const params = [];
    if (trimestre && trimestre !== "Todos") {
        query += " AND trimestre = ?";
        params.push(trimestre);
    }
    if (departamento && departamento !== "Todos") {
        query += " AND area_responsavel = ?";
        params.push(departamento);
    }
    query += " ORDER BY id DESC";
    const [rows] = await promisePool.query(query, params);
    return rows;
};

// FUNÇÃO ADICIONADA:
Okr.findById = async (id) => {
    const sql = 'SELECT * FROM okrs WHERE id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    return rows[0]; // Retorna o primeiro resultado ou undefined
};

Okr.update = async (id, okrData) => {
    const sql = `UPDATE okrs SET objetivo = ?, resultado_chave = ?, area_responsavel = ?, periodo = ?, tipo = ?, status = ?, descricao = ?, progresso = ?, impacto_financeiro = ?, trimestre = ?, peso_kpi = ? WHERE id = ?`;
    const values = [
        okrData.objetivo, okrData.resultado_chave, okrData.area_responsavel, okrData.periodo,
        okrData.tipo, okrData.status, okrData.descricao, okrData.progresso,
        okrData.impacto_financeiro, okrData.trimestre, okrData.peso_kpi, id
    ];
    const [result] = await promisePool.query(sql, values);
    return result;
};

Okr.delete = async (id) => {
    const sql = 'DELETE FROM okrs WHERE id = ?';
    const [result] = await promisePool.query(sql, [id]);
    return result;
};

// --- Dashboard ---
Okr.getResumo = async () => {
    const query = `SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'Concluído' THEN 1 ELSE 0 END) AS concluidos, AVG(progresso) AS media_progresso, SUM(impacto_financeiro) AS impacto_total FROM okrs`;
    const [rows] = await promisePool.query(query);
    return rows[0];
};

Okr.getGraficoTrimestre = async () => {
    const query = `SELECT trimestre, tipo, AVG(progresso) AS media_progresso FROM okrs WHERE periodo = '2025' GROUP BY trimestre, tipo`;
    const [rows] = await promisePool.query(query);
    return rows;
};

Okr.getRadarDesempenho = async () => {
    const query = `SELECT area_responsavel AS subject, tipo, SUM(progresso) AS total_progresso FROM okrs WHERE periodo = '2025' GROUP BY area_responsavel, tipo`;
    const [rows] = await promisePool.query(query);
    return rows;
};

module.exports = Okr;
