const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

router.get('/', tipoController.listarTipo);
router.get('/:id', tipoController.buscarTipo);
router.post('/', tipoController.cadastrarTipo);
router.put('/:id', tipoController.atualizarTipo);
router.delete('/:id', tipoController.deletarTipo);

module.exports = router;