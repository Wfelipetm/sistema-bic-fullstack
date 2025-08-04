const express = require('express');
const router = express.Router();
const serventiasController = require('../controllers/serventiasController');

router.get('/', serventiasController.listarServentias);
router.get('/:id', serventiasController.buscarServentias);
router.post('/', serventiasController.cadastrarServentias);
router.put('/:id', serventiasController.atualizarServentias);
router.delete('/:id', serventiasController.deletarServentias);

module.exports = router;