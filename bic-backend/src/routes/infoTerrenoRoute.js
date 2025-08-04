const express = require('express');
const router = express.Router();
const infoTerrenoController = require('../controllers/infoTerrenoController');

router.get('/', infoTerrenoController.listarInfoTerreno);
router.get('/:id', infoTerrenoController.buscarInfoTerreno);
router.post('/', infoTerrenoController.cadastrarInfoTerreno);
router.put('/:id', infoTerrenoController.atualizarInfoTerreno);
router.delete('/:id', infoTerrenoController.deletarInfoTerreno);

module.exports = router;