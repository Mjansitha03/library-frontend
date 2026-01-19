import Api from "./Api";

export const getAllBooks = () => Api.get("/books");

export const addBook = (data) => Api.post("/books", data);
export const updateBook = (id, data) => Api.put(`/books/${id}`, data);
export const deleteBook = (id) => Api.delete(`/books/${id}`);
