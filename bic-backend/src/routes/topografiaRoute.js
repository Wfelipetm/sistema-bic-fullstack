const express = require('express');
const router = express.Router();
const topografiaController = require('../controllers/topografiaController');

router.get('/', topografiaController.listarTopografia);
router.get('/:id', topografiaController.buscarTopografia);
router.post('/', topografiaController.cadastrarTopografia);
router.put('/:id', topografiaController.atualizarTopografia);
router.delete('/:id', topografiaController.deletarTopografia);

module.exports = router;