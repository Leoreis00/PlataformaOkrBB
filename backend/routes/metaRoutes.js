const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.get('/', metaController.getAllMetas);
router.post('/', metaController.createMeta);

module.exports = router;