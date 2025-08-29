const express = require('express');
const router = express.Router();
const proporcaoTerrenoController = require('../controllers/proporcaoTerrenoController');

router.get('/', proporcaoTerrenoController.getAll);
router.post('/', proporcaoTerrenoController.create);
router.put('/:id', proporcaoTerrenoController.update);
router.delete('/:id', proporcaoTerrenoController.delete);

module.exports = router;
