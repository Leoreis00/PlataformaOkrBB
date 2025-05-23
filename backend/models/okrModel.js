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
      impacto_financeiro,
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

// Buscar todas as OKRs
exports.getAllOKRs = (callback) => {
  db.query('SELECT * FROM okrs', callback);
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
