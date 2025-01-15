import { firestore } from "firebase-functions";
import { initializeApp, firestore as _firestore } from "firebase-admin";

initializeApp();
const db = _firestore();

export const generateInvoiceOnStatusChange = firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const bookingId = context.params.bookingId;
    const before = change.before.data();
    const after = change.after.data();

    // Check if the status changed from "pending" to "completed"
    if (before.status !== "completed" && after.status === "completed") {
      try {
        const { customerId, serviceDetails } = after;

        // Create the invoice
        const invoice = {
          invoiceId: `INV-${bookingId}-${Date.now()}`,
          bookingId,
          customerId,
          serviceDetails,
          amount: serviceDetails.price,
          date: new Date().toISOString(),
          status: "generated",
        };

        // Save the invoice to Firestore
        await db.collection("invoices").doc(invoice.invoiceId).set(invoice);

        console.log(`Invoice generated for booking: ${bookingId}`);
      } catch (error) {
        console.error(`Error generating invoice for booking: ${bookingId}`, error);
      }
    }
  });
