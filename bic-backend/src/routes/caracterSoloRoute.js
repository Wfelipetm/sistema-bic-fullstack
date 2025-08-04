const express = require('express');
const router = express.Router();
const caracterSoloController = require('../controllers/caracterSoloController');

router.get('/', caracterSoloController.listarCaracterSolo);
router.get('/:id', caracterSoloController.buscarCaracterSolo);
router.post('/', caracterSoloController.cadastrarCaracterSolo);
router.put('/:id', caracterSoloController.atualizarCaracterSolo);
router.delete('/:id', caracterSoloController.deletarCaracterSolo);

module.exports = router;