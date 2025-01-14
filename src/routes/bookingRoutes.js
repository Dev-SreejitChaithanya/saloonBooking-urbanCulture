import express from 'express';
import * as bookingController from '../controllers/bookingController.js';

const router = express.Router();

// Create a booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get a booking by its ID
router.get('/:id', bookingController.getBookingById);

// Update a booking
router.put('/:id', bookingController.updateBooking);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

export default router;
