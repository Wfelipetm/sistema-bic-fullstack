const express = require('express');
const router = express.Router();
const coberturaController = require('../controllers/coberturaController');

router.get('/', coberturaController.listarCobertura);
router.get('/:id', coberturaController.buscarCobertura);
router.post('/', coberturaController.cadastrarCobertura);
router.put('/:id', coberturaController.atualizarCobertura);
router.delete('/:id', coberturaController.deletarCobertura);

module.exports = router;