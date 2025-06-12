const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getUserBookings
} = require('../controllers/bookingController');

// All routes are protected
router.use(auth);

// User routes
router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:id', getBooking);

// Admin routes
router.use(checkRole(['admin']));
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router; 