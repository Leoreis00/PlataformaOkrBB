const express = require('express');
const router = express.Router();
const okrController = require('../controllers/okrController');
router.get('/resumo', okrController.getResumoOKRs);



// GET - Dados para gráfico por trimestre
router.get('/grafico-trimestre', okrController.getGraficoTrimestre);
// POST para cadastrar
router.post('/', okrController.createOKR);

// GET para listar todas
router.get('/', okrController.getOKRs);

//  GET para buscar uma OKR específica por ID
router.get('/:id', okrController.getOKRById);

//
router.delete('/:id', okrController.deleteOKR);
// PUT para editar uma OKR
router.put('/:id', okrController.updateOKR);





module.exports = router;
