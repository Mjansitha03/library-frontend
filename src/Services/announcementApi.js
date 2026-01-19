import Api from "./Api";

export const getAnnouncements = () => Api.get("/announcements");

export const createAnnouncement = (data) => Api.post("/announcements", data);

export const deleteAnnouncement = (id) => Api.delete(`/announcements/${id}`);
