const express = require('express');
const router = express.Router();
const obsLogradouroController = require('../controllers/obsLogradouroController');

router.get('/', obsLogradouroController.listarObsLogradouro);
router.get('/:id', obsLogradouroController.buscarObsLogradouro);
router.post('/', obsLogradouroController.cadastrarObsLogradouro);
router.put('/:id', obsLogradouroController.atualizarObsLogradouro);
router.delete('/:id', obsLogradouroController.deletarObsLogradouro);

module.exports = router;