import { useEffect, useState } from "react";
import { getMyReservations } from "../../Services/reservationApi";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [timers, setTimers] = useState({});

  const fetchReservations = async () => {
    try {
      const res = await getMyReservations();
      setReservations(res.data);

      const initialTimers = {};
      res.data.forEach(r => {
        if (r.status === "notified" && r.expiresAt) {
          initialTimers[r._id] = Math.max(
            new Date(r.expiresAt).getTime() - Date.now(),
            0
          );
        }
      });
      setTimers(initialTimers);
    } catch {
      setReservations([]);
    }
  };

  
  useEffect(() => {
    fetchReservations();
    const refreshInterval = setInterval(fetchReservations, 10000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const updated = {};
        Object.keys(prev).forEach(key => {
          updated[key] = Math.max(prev[key] - 1000, 0);
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  const formatTime = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700 text-center">My Reservations</h2>

      {reservations.length === 0 ? (
        <p className="text-center">No reservations found</p>
      ) : (
        reservations.map(r => (
          <div key={r._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{r.book.title}</h3>
            <p className="text-sm text-blue-600">Status: {r.status}</p>

            {r.status === "notified" && timers[r._id] > 0 && (
              <p className="text-red-500 text-sm">
                ⏳ Expires in {formatTime(timers[r._id])}
              </p>
            )}

            {r.status === "notified" && timers[r._id] <= 0 && (
              <p className="text-gray-500 text-sm">Reservation expired</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;
  