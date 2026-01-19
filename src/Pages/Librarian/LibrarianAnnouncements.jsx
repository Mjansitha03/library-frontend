
import LibrarianAnnouncementForm from "../../Components/announcements/LibrarianAnnouncementForm";

const LibrarianAnnouncements = () => {
  return (
    <div className="max-w-4xl mx-auto px-3 md:px-0 space-y-4">
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl md:text-2xl font-semibold">
          Announcements
        </h2>
        {/* <p className="text-sm text-gray-500">
          Publish updates for library users
        </p> */}
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <LibrarianAnnouncementForm refresh={() => {}} />
      </div>
    </div>
  );
};

export default LibrarianAnnouncements;
