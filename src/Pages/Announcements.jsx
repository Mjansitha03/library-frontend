import { useEffect, useState, useMemo } from "react";
import { getAnnouncements } from "../Services/announcementApi";
import AnnouncementCard from "../Components/announcements/AnnouncementCard";
import Pagination from "../Components/Pagination";

const LIMIT = 10;

const Announcements = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const loadAnnouncements = async () => {
      try {
        const res = await getAnnouncements({ signal: controller.signal });
        setData(res.data); 
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Failed to load announcements", err);
        }
      }
    };

    loadAnnouncements();
    return () => controller.abort();
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * LIMIT;
    return data.slice(startIndex, startIndex + LIMIT);
  }, [data, page]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Announcements</h2>

      {paginatedData.length === 0 ? (
        <p className="text-center text-gray-500">No announcements available</p>
      ) : (
        <div className="space-y-4">
          {paginatedData.map((a) => (
            <AnnouncementCard key={a._id} announcement={a} />
          ))}
        </div>
      )}

      {data.length > LIMIT && (
        <Pagination total={data.length} page={page} setPage={setPage} limit={LIMIT} />
      )}
    </div>
  );
};

export default Announcements;
