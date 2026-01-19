import Api from "./Api";

export const getAllApprovedReviews = () => Api.get("/reviews/approved");

export const addReview = (data) => Api.post("/reviews", data);
export const getMyReviews = () => Api.get("/reviews/my");

export const approveReview = (id) => Api.put(`/reviews/approve/${id}`);
export const deleteReview = (id) => Api.delete(`/reviews/${id}`);
