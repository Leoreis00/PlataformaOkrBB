const db = require('../config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM metas', callback);
};

exports.create = (meta, callback) => {
  const { okr_id, descricao, status } = meta;
  db.query('INSERT INTO metas (okr_id, descricao, status) VALUES (?, ?, ?)', [okr_id, descricao, status], callback);
};