const express = require('express');
const router = express.Router();
const tipoFachadaController = require('../controllers/tipoFachadaController');

router.get('/', tipoFachadaController.getAll);
router.post('/', tipoFachadaController.create);
router.put('/:id', tipoFachadaController.update);
router.delete('/:id', tipoFachadaController.delete);

module.exports = router;
