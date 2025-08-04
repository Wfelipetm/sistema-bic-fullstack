const express = require('express');
const router = express.Router();
const nivelamentoController = require('../controllers/nivelamentoController');

router.get('/', nivelamentoController.listarNivelamento);
router.get('/:id', nivelamentoController.buscarNivelamento);
router.post('/', nivelamentoController.cadastrarNivelamento);
router.put('/:id', nivelamentoController.atualizarNivelamento);
router.delete('/:id', nivelamentoController.deletarNivelamento);

module.exports = router;