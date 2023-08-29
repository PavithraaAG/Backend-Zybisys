const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isLoggedIn } = require('../middleware/authMiddleware'); 

router.post('/book', isLoggedIn, bookingController.bookBus);


router.get('/bookings', isLoggedIn, bookingController.getUserBookings);

module.exports = router;
