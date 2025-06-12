const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['consultation', 'measure', 'hair', 'skin', 'makeup', 'spa']
  },
  subCategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
