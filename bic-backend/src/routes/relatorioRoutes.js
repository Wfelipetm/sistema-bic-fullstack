const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/', relatorioController.listarRelatorios);
router.get('/:id', relatorioController.buscarRelatorio);

// Rotas para status
router.put('/:id/status', relatorioController.atualizarStatus);
router.get('/:id/historico', relatorioController.buscarHistoricoStatus);
router.get('/status/:status', relatorioController.listarRelatoriosPorStatus);

module.exports = router;