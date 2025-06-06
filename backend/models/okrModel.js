// backend/models/okrModel.js
const db = require('../config/db');

// Criar nova OKR
exports.createOKR = (okrData, callback) => {
  const {
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi
  } = okrData;

  const sql = `
    INSERT INTO okrs (
      objetivo,
      resultado_chave,
      area_responsavel,
      periodo,
      tipo,
      status,
      descricao,
      progresso,
      impacto_financero,
      trimestre,
      peso_kpi
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi
  ], callback);
};

// Buscar todas as OKRs com filtros
exports.getAllOKRs = (trimestre, departamento, callback) => {
  let query = "SELECT * FROM okrs WHERE 1=1"; // 'WHERE 1=1' facilita a adição de condições
  const params = [];

  // Se um trimestre específico for passado e não for "Todos"
  if (trimestre && trimestre !== "Todos") {
    // É importante que o valor de `trimestre` no seu banco de dados
    // corresponda ao que você está enviando. Se for "1", "2", "3", "4"
    // no banco, certifique-se de que o frontend envia "1", "2", "3", "4".
    // No `okrApi.js`, eu já adicionei `.replace("º Trimestre", "")` para isso.
    query += " AND trimestre = ?";
    params.push(trimestre);
  }

  // Se um departamento específico for passado e não for "Todos"
  if (departamento && departamento !== "Todos") {
    query += " AND area_responsavel = ?";
    params.push(departamento);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao buscar OKRs no modelo:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Buscar OKR por ID
exports.getOKRById = (id, callback) => {
  const query = 'SELECT * FROM okrs WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

// Excluir OKR
exports.deleteOKR = (id, callback) => {
  const query = 'DELETE FROM okrs WHERE id = ?';
  db.query(query, [id], callback);
};

// Atualizar OKR
exports.updateOKR = (id, okrData, callback) => {
  const {
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi
  } = okrData;

  const sql = `
    UPDATE okrs
    SET
      objetivo = ?,
      resultado_chave = ?,
      area_responsavel = ?,
      periodo = ?,
      tipo = ?,
      status = ?,
      descricao = ?,
      progresso = ?,
      impacto_financeiro = ?,
      trimestre = ?,
      peso_kpi = ?
    WHERE id = ?
  `;

  db.query(sql, [
    objetivo,
    resultado_chave,
    area_responsavel,
    periodo,
    tipo,
    status,
    descricao,
    progresso,
    impacto_financeiro,
    trimestre,
    peso_kpi,
    id
  ], callback);
};