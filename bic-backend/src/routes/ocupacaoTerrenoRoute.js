const express = require('express');
const router = express.Router();
const ocupacaoTerrenoController = require('../controllers/ocupacaoTerrenoController');

router.get('/', ocupacaoTerrenoController.getAll);
router.post('/', ocupacaoTerrenoController.create);
router.put('/:id', ocupacaoTerrenoController.update);
router.delete('/:id', ocupacaoTerrenoController.delete);

module.exports = router;
