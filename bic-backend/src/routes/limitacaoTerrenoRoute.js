const express = require('express');
const router = express.Router();
const limitacaoTerrenoController = require('../controllers/limitacaoTerrenoController');

router.get('/', limitacaoTerrenoController.getAll);
router.post('/', limitacaoTerrenoController.create);
router.put('/:id', limitacaoTerrenoController.update);
router.delete('/:id', limitacaoTerrenoController.delete);

module.exports = router;
