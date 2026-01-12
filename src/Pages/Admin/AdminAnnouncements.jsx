import AdminAnnouncementForm from "../../Components/announcements/AdminAnnouncementForm";

const AdminAnnouncements = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Announcements</h1>
      <AdminAnnouncementForm refresh={() => {}} />
    </div>
  );
};

export default AdminAnnouncements;
