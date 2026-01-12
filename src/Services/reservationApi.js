import Api from "./Api";

export const reserveBook = (bookId) =>
  Api.post(`/reservations/${bookId}`);

export const getMyReservations = () =>
  Api.get("/reservations/my");

export const getAllReservations = () =>
  Api.get("/reservations");
