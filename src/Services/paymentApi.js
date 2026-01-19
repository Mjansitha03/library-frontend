import Api from "./Api";

export const createPaymentOrder = (amount, purpose) => {
  return Api.post("/payments/create-order", { amount, purpose });
};

export const verifyPayment = (paymentData) => {
  return Api.post("/payments/verify", paymentData);
};

export const getMyPayments = () => {
  return Api.get("/payments/my-payments");
};

export const getAllPayments = () => {
  return Api.get("/payments");
};
