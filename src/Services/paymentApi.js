import Api from "./Api";

/* ================= CREATE PAYMENT ORDER ================= */
export const createPaymentOrder = (amount, purpose) => {
  // amount: number (₹), purpose: string (e.g., "FINE", "MEMBERSHIP")
  return Api.post("/payments/create-order", { amount, purpose });
};

/* ================= VERIFY PAYMENT ================= */
export const verifyPayment = (paymentData) => {
  // paymentData contains: razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId
  return Api.post("/payments/verify", paymentData);
};

/* ================= GET USER PAYMENT HISTORY ================= */
export const getMyPayments = () => {
  return Api.get("/payments/my-payments");
};

/* ================= GET ALL PAYMENTS (ADMIN) ================= */
export const getAllPayments = () => {
  return Api.get("/payments");
};
