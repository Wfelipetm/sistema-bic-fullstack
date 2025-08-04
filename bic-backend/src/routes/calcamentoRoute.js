const express = require('express');
const router = express.Router();
const calcamentoController = require('../controllers/calcamentoController');

router.get('/', calcamentoController.listarCalcamento);
router.get('/:id', calcamentoController.buscarCalcamento);
router.post('/', calcamentoController.cadastrarCalcamento);
router.put('/:id', calcamentoController.atualizarCalcamento);
router.delete('/:id', calcamentoController.deletarCalcamento);

module.exports = router;