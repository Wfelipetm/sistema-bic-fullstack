const express = require('express');
const router = express.Router();
const posicaoUnidadeController = require('../controllers/posicaoUnidadeController');

router.get('/', posicaoUnidadeController.getAll);
router.post('/', posicaoUnidadeController.create);
router.put('/:id', posicaoUnidadeController.update);
router.delete('/:id', posicaoUnidadeController.delete);

module.exports = router;
