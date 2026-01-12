import { useEffect, useState } from "react";
import { getMyReservations } from "../../Services/reservationApi";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getMyReservations()
      .then(res => setReservations(res.data))
      .catch(() => setReservations([]));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-700">My Reservations</h2>

      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        reservations.map(r => (
          <div key={r._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{r.book.title}</h3>
            <p className="text-sm text-blue-600">
              Status: {r.status}
            </p>
            {r.status === "notified" && (
              <p className="text-red-500 text-sm">
                ⏳ Expires in 24 hours
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;
