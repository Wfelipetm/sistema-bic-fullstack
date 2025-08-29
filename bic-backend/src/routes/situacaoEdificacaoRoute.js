const express = require('express');
const router = express.Router();
const situacaoEdificacaoController = require('../controllers/situacaoEdificacaoController');

router.get('/', situacaoEdificacaoController.getAll);
router.post('/', situacaoEdificacaoController.create);
router.put('/:id', situacaoEdificacaoController.update);
router.delete('/:id', situacaoEdificacaoController.delete);

module.exports = router;
