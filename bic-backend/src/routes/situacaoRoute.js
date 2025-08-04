const express = require('express');
const router = express.Router();
const situacaoController = require('../controllers/situacaoController');

router.get('/', situacaoController.listarSituacao);
router.get('/:id', situacaoController.buscarSituacao);
router.post('/', situacaoController.cadastrarSituacao);
router.put('/:id', situacaoController.atualizarSituacao);
router.delete('/:id', situacaoController.deletarSituacao);

module.exports = router;