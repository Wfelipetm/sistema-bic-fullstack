const express = require('express');
const router = express.Router();
const pedologiaTerrenoController = require('../controllers/pedologiaTerrenoController');

router.get('/', pedologiaTerrenoController.getAll);
router.post('/', pedologiaTerrenoController.create);
router.put('/:id', pedologiaTerrenoController.update);
router.delete('/:id', pedologiaTerrenoController.delete);

module.exports = router;
