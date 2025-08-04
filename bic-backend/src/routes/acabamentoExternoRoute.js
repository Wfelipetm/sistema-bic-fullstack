const express = require('express');
const router = express.Router();
const acabamentoExternoController = require('../controllers/acabamentoExternoController');

router.get('/', acabamentoExternoController.listarAcabamentoExterno);
router.get('/:id', acabamentoExternoController.buscarAcabamentoExterno);
router.post('/', acabamentoExternoController.cadastrarAcabamentoExterno);
router.put('/:id', acabamentoExternoController.atualizarAcabamentoExterno);
router.delete('/:id', acabamentoExternoController.deletarAcabamentoExterno);

module.exports = router;