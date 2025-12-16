const express = require('express');
const router = express.Router();
const suratController = require('../controllers/suratController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Route
router.get('/public/search', suratController.searchSuratKeluar);

// Protected Routes
router.use(authMiddleware);

router.get('/', suratController.getAllSurat);
router.get('/:id', suratController.getSuratById);

// Admin & Petugas Routes
router.post('/', roleMiddleware(['Admin', 'Petugas']), upload.single('file'), suratController.createSurat);
router.put('/:id', roleMiddleware(['Admin', 'Petugas']), upload.single('file'), suratController.updateSurat);
router.delete('/:id', roleMiddleware(['Admin']), suratController.deleteSurat);

// Pimpinan Routes
router.put('/approve/:id', roleMiddleware(['Pimpinan']), suratController.approveSurat);

module.exports = router;
