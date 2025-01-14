import * as bookingModel from '../models/bookingModel.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const bookingId = await bookingModel.addBooking(req.body);
    successResponse(res, { id: bookingId }, 'Booking created successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getBookings();
    successResponse(res, bookings, 'Bookings fetched successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Get a booking by its ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await bookingModel.getBookingById(id);
    successResponse(res, booking, 'Booking found');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Update an existing booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    await bookingModel.updateBooking(id, updatedData);
    successResponse(res, null, 'Booking updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await bookingModel.deleteBooking(id);
    successResponse(res, null, 'Booking deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};
