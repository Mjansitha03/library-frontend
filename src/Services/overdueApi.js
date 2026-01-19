import Api from "./Api";

export const getOverdue = () =>
  Api.get("/overdue");
