import { db } from '../config/firebase.js';

const collectionName = 'bookings';

export const addBooking = async (data) => {
  const docRef = await db.collection(collectionName).add(data);
  return docRef.id;
};

export const getBookings = async () => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getBookingById = async (id) => {
  const doc = await db.collection(collectionName).doc(id).get();
  if (!doc.exists) throw new Error('Booking not found');
  return { id: doc.id, ...doc.data() };
};

export const updateBooking = async (id, data) => {
  await db.collection(collectionName).doc(id).update(data);
};

export const deleteBooking = async (id) => {
  await db.collection(collectionName).doc(id).delete();
};
