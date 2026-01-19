import Api from "./Api";

export const getMyBorrows = () => Api.get("/borrows/my");

export const getMyBorrowedBooks = () => Api.get("/borrows/my-borrowed-books");

export const getBorrowHistory = () => Api.get("/borrows/history");

export const getAllBorrows = () => Api.get("/borrows");

export const checkoutBook = (data) => Api.post("/borrows/checkout", data);
