import Api from "./Api";

// PUBLIC
export const getAnnouncements = () =>
  Api.get("/announcements");

// ADMIN / LIBRARIAN
export const createAnnouncement = (data) =>
  Api.post("/announcements", data);

export const deleteAnnouncement = (id) =>
  Api.delete(`/announcements/${id}`);


