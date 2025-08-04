const express = require('express');
const router = express.Router();
const usoController = require('../controllers/usoController');

router.get('/', usoController.listarUso);
router.get('/:id', usoController.buscarUso);
router.post('/', usoController.cadastrarUso);
router.put('/:id', usoController.atualizarUso);
router.delete('/:id', usoController.deletarUso);

module.exports = router;