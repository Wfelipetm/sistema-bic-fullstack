const express = require('express');
const router = express.Router();
const tipoForroController = require('../controllers/tipoForroController');

router.get('/', tipoForroController.getAll);
router.post('/', tipoForroController.create);
router.put('/:id', tipoForroController.update);
router.delete('/:id', tipoForroController.delete);

module.exports = router;
