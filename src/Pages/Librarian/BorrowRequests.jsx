import { useEffect, useState } from "react";
import { getBorrowRequests, rejectBorrowRequest } from "../../Services/borrowRequestApi";
import { useNavigate } from "react-router-dom";
import BorrowRequestColumn from "../../Components/librarian/BorrowRequestColumn";
import { ImSpinner2 } from "react-icons/im";

const BorrowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await getBorrowRequests();
      setRequests(res.data.filter((r) => r.type === "borrow"));
    } catch (err) {
      console.error(err);
      alert("Failed to load borrow requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (r) => {
    navigate("/librarian", {
      state: { userId: r.user._id, bookId: r.book._id, requestId: r._id }
    });
  };

  const handleReject = async (r) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;

    try {
      await rejectBorrowRequest(r._id);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === r._id ? { ...req, status: "rejected" } : req
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <ImSpinner2 className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Borrow Requests</h2>
          <p className="text-sm text-gray-500">Review and manage borrow requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BorrowRequestColumn
          title="Pending"
          data={requests.filter((r) => r.status === "pending")}
          onApprove={handleApprove}
          onReject={handleReject}
          color="text-yellow-600"
        />

        <BorrowRequestColumn
          title="Approved / Completed"
          data={requests.filter((r) =>
            ["approved", "completed"].includes(r.status)
          )}
          color="text-green-600"
        />

        <BorrowRequestColumn
          title="Rejected"
          data={requests.filter((r) => r.status === "rejected")}
          color="text-red-600"
        />
      </div>
    </div>
  );
};

export default BorrowRequests;
