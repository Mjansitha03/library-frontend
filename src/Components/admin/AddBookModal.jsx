import { useState, useEffect } from "react";
import { addBook, updateBook } from "../../Services/bookApi";
import { roleTheme } from "../../../Utils/roleTheme";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaUserEdit,
  FaLayerGroup,
  FaBarcode,
  FaImage,
  FaSave,
  FaTimes,
  FaHashtag,
  FaCheckCircle,
} from "react-icons/fa";

const AddBookModal = ({ close, refresh, bookData }) => {
  const theme = roleTheme.admin;

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    isbn: "",
    image: "",
    totalCopies: "",
    availableCopies: "",
  });

  useEffect(() => {
    if (bookData) setForm({ ...bookData });
  }, [bookData]);

  // Auto set available copies when adding new book
  useEffect(() => {
    if (!bookData) {
      setForm((prev) => ({
        ...prev,
        availableCopies: prev.totalCopies,
      }));
    }
  }, [form.totalCopies, bookData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    bookData
      ? await updateBook(bookData._id, form)
      : await addBook(form);
    refresh();
    close();
  };

  const fields = [
    { name: "title", label: "Book Title", icon: <FaBook />, type: "text" },
    { name: "author", label: "Author", icon: <FaUserEdit />, type: "text" },
    { name: "genre", label: "Genre", icon: <FaLayerGroup />, type: "text" },
    {
      name: "publicationYear",
      label: "Publication Year",
      icon: <FaHashtag />,
      type: "number",
    },
    { name: "isbn", label: "ISBN", icon: <FaBarcode />, type: "text" },
    { name: "image", label: "Image URL", icon: <FaImage />, type: "text" },
    {
      name: "totalCopies",
      label: "Total Copies",
      icon: <FaHashtag />,
      type: "number",
    },
    {
      name: "availableCopies",
      label: "Available Copies",
      icon: <FaCheckCircle />,
      type: "number",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ duration: 0.25 }}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
        >
          {/* HEADER */}
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaBook className="text-red-600" />
              {bookData ? "Edit Book Details" : "Add New Book"}
            </h2>
            <button onClick={close}>
              <FaTimes className="text-gray-500 hover:text-red-600 text-lg" />
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((f) => (
                <div key={f.name} className="space-y-1">
                  <label className="text-sm font-medium text-gray-600">
                    {f.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {f.icon}
                    </span>
                    <input
                      name={f.name}
                      value={form[f.name] || ""}
                      onChange={handleChange}
                      type={f.type}
                      className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm
                        focus:ring-2 focus:ring-red-400 focus:border-red-400
                        transition outline-none"
                      placeholder={`Enter ${f.label}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
              <button
                type="button"
                onClick={close}
                className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className={`${theme.button} text-white px-6 py-2 rounded-xl flex items-center gap-2`}
              >
                <FaSave />
                {bookData ? "Update Book" : "Add Book"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddBookModal;
