const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user._id
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      message: 'Error creating booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all bookings (admin only)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      message: 'Error fetching bookings',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ 
      message: 'Error fetching your bookings',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get a specific booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is admin or booking owner
    if (req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      message: 'Error fetching booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ 
      message: 'Error updating booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ 
      message: 'Error deleting booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 