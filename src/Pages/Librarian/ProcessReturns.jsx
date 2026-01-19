import { useEffect, useState } from "react";
import {
  getBorrowRequests,
  approveReturnRequest,
} from "../../Services/borrowRequestApi";
import { roleTheme } from "../../../Utils/roleTheme";
import ReturnColumn from "../../Components/librarian/ReturnColumn";


const ProcessReturns = () => {
  const theme = roleTheme.librarian;
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const res = await getBorrowRequests();

      const returns = res.data
        .filter((r) => r.type === "return")
        .map((r) => ({ ...r }));

      setRequests(returns);
    } catch (err) {
      console.error("Failed to load return requests");
    }
  };

  const confirmReturn = async (requestId) => {
    try {
      setLoadingId(requestId);
      await approveReturnRequest(requestId);
      await loadRequests();
    } catch (err) {
      console.error("Return approval failed");
    } finally {
      setLoadingId(null);
    }
  };

  const pending = requests.filter((r) => r.status === "pending");
  const completed = requests.filter((r) => r.status === "completed");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">Return Requests</h2>
          <p className="text-sm text-gray-500">Confirm returned books</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReturnColumn
          title="Pending Returns"
          data={pending}
          theme={theme}
          onConfirm={confirmReturn}
          loadingId={loadingId}
        />
        <ReturnColumn
          title="Completed Returns"
          data={completed}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ProcessReturns;
