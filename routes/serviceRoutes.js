const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  getAllServices,
  getServicesByCategory,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// Public routes
router.get('/', getAllServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getService);

// Protected admin routes
router.use(auth);
router.use(checkRole(['admin']));
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router; 