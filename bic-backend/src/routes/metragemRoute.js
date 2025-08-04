const express = require('express');
const router = express.Router();
const metragemController = require('../controllers/metragemController');

router.get('/', metragemController.listarMetragem);
router.get('/:id', metragemController.buscarMetragem);
router.post('/', metragemController.cadastrarMetragem);
router.put('/:id', metragemController.atualizarMetragem);
router.delete('/:id', metragemController.deletarMetragem);

module.exports = router;