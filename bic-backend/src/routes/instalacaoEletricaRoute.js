const express = require('express');
const router = express.Router();
const instalacaoEletricaController = require('../controllers/instalacaoEletricaController');

router.get('/', instalacaoEletricaController.getAll);
router.post('/', instalacaoEletricaController.create);
router.put('/:id', instalacaoEletricaController.update);
router.delete('/:id', instalacaoEletricaController.delete);

module.exports = router;
