const express = require('express');
const router = express.Router();
const disposisiController = require('../controllers/disposisiController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Only Pimpinan can create disposisi
router.post('/', roleMiddleware(['Pimpinan']), disposisiController.createDisposisi);

// All authenticated users can view disposisi (if they have access to the surat)
router.get('/:suratId', disposisiController.getDisposisiBySurat);

module.exports = router;
