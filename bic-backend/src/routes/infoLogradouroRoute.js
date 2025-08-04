const express = require('express');
const router = express.Router();
const infoLogradouroController = require('../controllers/infoLogradouroController');

router.get('/', infoLogradouroController.listarInfoLogradouro);
router.get('/:id', infoLogradouroController.buscarInfoLogradouro);
router.post('/', infoLogradouroController.cadastrarInfoLogradouro);
router.put('/:id', infoLogradouroController.atualizarInfoLogradouro);
router.delete('/:id', infoLogradouroController.deletarInfoLogradouro);

module.exports = router;