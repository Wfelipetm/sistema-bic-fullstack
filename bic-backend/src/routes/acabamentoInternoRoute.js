const express = require('express');
const router = express.Router();
const acabamentoInternoController = require('../controllers/acabamentoInternoController');

router.get('/', acabamentoInternoController.listarAcabamentoInterno);
router.get('/:id', acabamentoInternoController.buscarAcabamentoInterno);
router.post('/', acabamentoInternoController.cadastrarAcabamentoInterno);
router.put('/:id', acabamentoInternoController.atualizarAcabamentoInterno);
router.delete('/:id', acabamentoInternoController.deletarAcabamentoInterno);

module.exports = router;