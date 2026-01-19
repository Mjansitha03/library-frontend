import { useState } from "react";
import { FaEnvelope, FaPhone, FaEdit, FaSave } from "react-icons/fa";

const UserProfileCard = ({ user, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [phone, setPhone] = useState(user.phone || "");

  const handleSave = () => {
    onUpdate({ phone });
    setEdit(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition w-full max-w-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        {user.name}
      </h2>

      <p className="flex justify-center items-center gap-2 text-gray-600 mt-2 text-sm">
        <FaEnvelope className="text-blue-600" />
        {user.email}
      </p>

      <hr className="my-5" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaPhone className="text-green-600" />

          {edit ? (
            <input
              type="text"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="border rounded-lg px-3 py-1.5 w-40 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700 text-sm">
              {user.phone || "Not provided"}
            </span>
          )}
        </div>

        {edit ? (
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-800 transition"
            title="Save"
          >
            <FaSave size={18} />
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit phone"
          >
            <FaEdit size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
