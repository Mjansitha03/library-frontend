import Api from "./Api";

/* ================= USER ================= */
// Get all active borrows (full objects)
export const getMyBorrows = () => Api.get("/borrows/my");

// Get only borrowed book IDs
export const getMyBorrowedBooks = () => Api.get("/borrows/my-borrowed-books");

// Get borrow history
export const getBorrowHistory = () => Api.get("/borrows/history");

/* ================= ADMIN / LIBRARIAN ================= */
// Get all borrows (admin/librarian)
export const getAllBorrows = () => Api.get("/borrows");

// Checkout a book to a user
// data = { userId, bookId, borrowRequestId (optional) }
export const checkoutBook = (data) => Api.post("/borrows/checkout", data);
    