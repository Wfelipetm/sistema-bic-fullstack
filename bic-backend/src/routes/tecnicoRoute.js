const express = require('express');
const router = express.Router();
const tecnicoController = require('../controllers/tecnicoController');

// Rotas para técnicos
router.get('/', tecnicoController.getAll);
router.get('/:id', tecnicoController.getById);
router.post('/', tecnicoController.create);
router.put('/:id', tecnicoController.update);
router.delete('/:id', tecnicoController.deleteById);

// Rota para buscar boletins de um técnico específico
router.get('/:id/boletins', tecnicoController.getBoletinsByTecnico);

module.exports = router;
