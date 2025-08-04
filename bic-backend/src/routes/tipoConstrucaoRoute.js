const express = require('express');
const router = express.Router();
const tipoConstrucaoController = require('../controllers/tipoConstrucaoController');

router.get('/', tipoConstrucaoController.listarTipoConstrucao);
router.get('/:id', tipoConstrucaoController.buscarTipoConstrucao);
router.post('/', tipoConstrucaoController.cadastrarTipoConstrucao);
router.put('/:id', tipoConstrucaoController.atualizarTipoConstrucao);
router.delete('/:id', tipoConstrucaoController.deletarTipoConstrucao);

module.exports = router;