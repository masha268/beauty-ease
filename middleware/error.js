const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error
  let statusCode = 500;
  let message = 'Something went wrong';
  let details = process.env.NODE_ENV === 'development' ? err.message : undefined;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    details = Object.values(err.errors).map(error => error.message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
    details = Object.keys(err.keyValue).map(key => `${key} already exists`);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    details
  });
};

module.exports = errorHandler; 