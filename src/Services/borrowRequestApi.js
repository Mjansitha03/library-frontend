import Api from "./Api";

export const requestBorrow = (bookId) =>
  Api.post("/borrow-requests/borrow", { bookId });

export const requestReturn = (borrowId) =>
  Api.post("/borrow-requests/return", { borrowId });

export const getBorrowRequests = () =>
  Api.get("/borrow-requests");

export const approveBorrowRequest = (id) =>
  Api.put(`/borrow-requests/approve-borrow/${id}`);

export const approveReturnRequest = (id) =>
  Api.put(`/borrow-requests/approve-return/${id}`);

export const rejectBorrowRequest = (id) =>
  Api.put(`/borrow-requests/reject/${id}`);

export const getMyBorrowRequests = () => 
  Api.get("/borrow-requests/my-borrow-requests");
