const express = require('express');
const router = express.Router();
const avaliUrbaLogradouroController = require('../controllers/avaliUrbaLogradouroController');

router.get('/', avaliUrbaLogradouroController.listarAvaliUrbaLogradouro);
router.get('/:id', avaliUrbaLogradouroController.buscarAvaliUrbaLogradouro);
router.post('/', avaliUrbaLogradouroController.cadastrarAvaliUrbaLogradouro);
router.put('/:id', avaliUrbaLogradouroController.atualizarAvaliUrbaLogradouro);
router.delete('/:id', avaliUrbaLogradouroController.deletarAvaliUrbaLogradouro);

module.exports = router;