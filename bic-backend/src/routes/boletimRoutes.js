const express = require('express');
const router = express.Router();

const boletimController = require('../controllers/boletimController');
const upload = require('../middleware/multerConfigBoletim');

router.get('/', boletimController.getAll);
router.get('/:id', boletimController.getById);
router.get('/:id/completo', boletimController.getBoletimCompleto);
// Rota de criação de boletim com upload de foto
router.post('/', upload.single('foto'), boletimController.create);

module.exports = router;