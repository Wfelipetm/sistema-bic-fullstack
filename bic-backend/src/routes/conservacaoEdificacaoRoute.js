const express = require('express');
const router = express.Router();
const conservacaoEdificacaoController = require('../controllers/conservacaoEdificacaoController');

router.get('/', conservacaoEdificacaoController.getAll);
router.post('/', conservacaoEdificacaoController.create);
router.put('/:id', conservacaoEdificacaoController.update);
router.delete('/:id', conservacaoEdificacaoController.delete);

module.exports = router;
