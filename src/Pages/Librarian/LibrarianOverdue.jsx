import { useEffect, useState } from "react";
import { getOverdue } from "../../Services/overdueApi";
import { ImSpinner2 } from "react-icons/im";
import Pagination from "../../Components/Pagination";
import { roleTheme } from "../../../Utils/roleTheme";

const theme = roleTheme.librarian;

const LibrarianOverdue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getOverdue();
        setData(res.data.data || []);
      } catch (err) {
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [data.length]);

  const getOverdueDays = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = now - due;
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ImSpinner2 className={`text-3xl animate-spin ${theme.text}`} />
      </div>
    );
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = data.slice(startIndex, startIndex + limit);

  return (
    <div className={`p-4 sm:p-6 ${theme.bg}`}>
      <h1 className={`text-xl sm:text-2xl font-semibold mb-6 ${theme.text}`}>
        ⏰ Overdue Users & Fines
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No overdue records 🎉</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow mb-6">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Book</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-center">Overdue (Days)</th>
                  <th className="p-3 text-center">Fine (₹)</th>
                  <th className="p-3 text-center">Payment</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((r, i) => {
                  const overdueDays = getOverdueDays(r.dueDate);
                  return (
                    <tr
                      key={r._id || r.borrowId || startIndex + i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        <p className="font-medium">
                          {r.user?.name || "Deleted User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {r.user?.email || "N/A"}
                        </p>
                      </td>

                      <td className="p-3">{r.book?.title || "Deleted Book"}</td>

                      <td className="p-3">
                        {new Date(r.dueDate).toLocaleDateString()}
                      </td>

                      <td className="p-3 text-center text-red-600 font-semibold">
                        {overdueDays}
                      </td>

                      <td className="p-3 text-center font-semibold">
                        ₹{r.fine}
                      </td>

                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            r.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            total={data.length}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        </>
      )}
    </div>
  );
};

export default LibrarianOverdue;
