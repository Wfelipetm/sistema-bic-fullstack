const express = require('express');
const router = express.Router();
const instalacaoSanitariaController = require('../controllers/instalacaoSanitariaController');

router.get('/', instalacaoSanitariaController.getAll);
router.post('/', instalacaoSanitariaController.create);
router.put('/:id', instalacaoSanitariaController.update);
router.delete('/:id', instalacaoSanitariaController.delete);

module.exports = router;
