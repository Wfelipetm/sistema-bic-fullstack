const express = require('express');
const router = express.Router();
const infoConstrucaoController = require('../controllers/infoConstrucaoController');

router.get('/', infoConstrucaoController.listarInfoConstrucao);
router.get('/:id', infoConstrucaoController.buscarInfoConstrucao);
router.post('/', infoConstrucaoController.cadastrarInfoConstrucao);
router.put('/:id', infoConstrucaoController.atualizarInfoConstrucao);
router.delete('/:id', infoConstrucaoController.deletarInfoConstrucao);

module.exports = router;