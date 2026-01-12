// MyBooks.jsx
import { useEffect, useState } from "react";
import { getMyBorrows } from "../../Services/borrowApi";
import { getMyBorrowRequests } from "../../Services/borrowRequestApi";
import BookList from "../../Components/user/BookList";

const MyBooks = () => {
  const [active, setActive] = useState([]);
  const [pending, setPending] = useState([]);

  const load = async () => {
    const borrows = await getMyBorrows();
    const requests = await getMyBorrowRequests();

    setActive(borrows.data);
    setPending(requests.data.filter((r) => r.type === "return"));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-h-[300px]">
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-blue-700">
          Active Borrows
        </h2>
        <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          <BookList books={active} refresh={load} />
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 min-h-[300px]">
        <h2 className="text-lg sm:text-xl font-bold mb-3 text-blue-700">
          Pending Returns
        </h2>
        <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          <BookList books={pending} pending refresh={load} />
        </div>
      </section>
    </div>
  );
};

export default MyBooks;
