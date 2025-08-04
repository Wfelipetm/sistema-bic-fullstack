const express = require('express');
const router = express.Router();
const esquadrilhaController = require('../controllers/esquadrilhaController');

router.get('/', esquadrilhaController.listarEsquadrilha);
router.get('/:id', esquadrilhaController.buscarEsquadrilha);
router.post('/', esquadrilhaController.cadastrarEsquadrilha);
router.put('/:id', esquadrilhaController.atualizarEsquadrilha);
router.delete('/:id', esquadrilhaController.deletarEsquadrilha);

module.exports = router;