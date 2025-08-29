const express = require('express');
const router = express.Router();
const situacaoUnidadeController = require('../controllers/situacaoUnidadeController');

router.get('/', situacaoUnidadeController.getAll);
router.post('/', situacaoUnidadeController.create);
router.put('/:id', situacaoUnidadeController.update);
router.delete('/:id', situacaoUnidadeController.delete);

module.exports = router;
