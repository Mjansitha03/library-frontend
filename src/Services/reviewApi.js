import Api from "./Api";

// PUBLIC: all approved reviews
export const getAllApprovedReviews = () => Api.get("/reviews/approved");

// USER
export const addReview = (data) => Api.post("/reviews", data);
export const getMyReviews = () => Api.get("/reviews/my");

// ADMIN
export const approveReview = (id) => Api.put(`/reviews/approve/${id}`);
export const deleteReview = (id) => Api.delete(`/reviews/${id}`);
