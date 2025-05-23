const Meta = require('../models/metaModel');

exports.getAllMetas = (req, res) => {
  Meta.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createMeta = (req, res) => {
  const newMeta = req.body;
  Meta.create(newMeta, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...newMeta });
  });
};