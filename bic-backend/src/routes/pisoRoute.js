const express = require('express');
const router = express.Router();
const pisoController = require('../controllers/pisoController');

router.get('/', pisoController.listarPiso);
router.get('/:id', pisoController.buscarPiso);
router.post('/', pisoController.cadastrarPiso);
router.put('/:id', pisoController.atualizarPiso);
router.delete('/:id', pisoController.deletarPiso);

module.exports = router;