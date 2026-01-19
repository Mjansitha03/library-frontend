import { useEffect, useState } from "react";
import { createAnnouncement } from "../../Services/announcementApi";
import { getAllUsers } from "../../Services/userApi";
import { roleTheme } from "../../../Utils/roleTheme";

const LibrarianAnnouncementForm = ({ refresh }) => {
  const theme = roleTheme.librarian;

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    targetUsers: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.filter((u) => u.role === "user"));
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.targetUsers.length) {
      alert("Please select at least one user");
      return;
    }

    setLoading(true);
    try {
      await createAnnouncement(form);
      refresh();
      setForm({ title: "", message: "", targetUsers: [] });
      setShowUsers(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`${theme.bg} rounded-xl shadow p-6 space-y-6`}
    >
      <input
        className={`border rounded-lg px-4 py-2 w-full focus:ring-2 ring-${theme.ring}`}
        placeholder="Announcement title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        rows={4}
        className={`border rounded-lg px-4 py-2 w-full resize-none focus:ring-2 ring-${theme.ring}`}
        placeholder="Announcement message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />

      <div>
        <button
          type="button"
          onClick={() => setShowUsers(!showUsers)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            showUsers
              ? `${theme.bgLight} ${theme.text}`
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {showUsers ? "Hide User Selection" : "Select Target Users"}
        </button>

        {showUsers && (
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Choose Users
            </label>

            <select
              multiple
              className={`border rounded-lg px-3 py-2 w-full h-40 focus:ring-2 ring-${theme.ring}`}
              value={form.targetUsers}
              onChange={(e) =>
                setForm({
                  ...form,
                  targetUsers: [...e.target.selectedOptions].map(
                    (o) => o.value,
                  ),
                })
              }
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} — {u.email}
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-400 mt-1">
              Hold Ctrl (Windows) / Cmd (Mac) to select multiple users
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-500">
          Selected Users:{" "}
          <span className="font-medium">{form.targetUsers.length || 0}</span>
        </p>

        <button
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : theme.button
          }`}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default LibrarianAnnouncementForm;
