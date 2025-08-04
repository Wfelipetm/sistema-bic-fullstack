const express = require('express');
const router = express.Router();
const forroController = require('../controllers/forroController');

router.get('/', forroController.listarForro);
router.get('/:id', forroController.buscarForro);
router.post('/', forroController.cadastrarForro);
router.put('/:id', forroController.atualizarForro);
router.delete('/:id', forroController.deletarForro);

module.exports = router;