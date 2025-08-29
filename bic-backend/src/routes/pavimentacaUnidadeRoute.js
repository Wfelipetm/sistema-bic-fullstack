const express = require('express');
const router = express.Router();
const pavimentacaUnidadeController = require('../controllers/pavimentacaUnidadeController');

router.get('/', pavimentacaUnidadeController.getAll);
router.post('/', pavimentacaUnidadeController.create);
router.put('/:id', pavimentacaUnidadeController.update);
router.delete('/:id', pavimentacaUnidadeController.delete);

module.exports = router;
