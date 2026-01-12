import { useState } from "react";
import { createAnnouncement } from "../../Services/announcementApi";
import { roleTheme } from "../../../Utils/roleTheme";

const AdminAnnouncementForm = ({ refresh }) => {
  const theme = roleTheme.admin;

  const [form, setForm] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAnnouncement({
        title: form.title,
        message: form.message,
        targetUsers: [], // 🌍 Global
      });

      refresh();
      setForm({ title: "", message: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={`${theme.bg} rounded-xl shadow p-6 space-y-6`}>

      <div>
        <label className="text-sm font-medium text-gray-600">Title</label>
        <input
          className={`mt-1 border rounded-lg px-4 py-2 w-full focus:ring-2 ring-${theme.ring}`}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="System maintenance notice"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600">Message</label>
        <textarea
          rows={4}
          className={`mt-1 border rounded-lg px-4 py-2 w-full resize-none focus:ring-2 ring-${theme.ring}`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Library will be closed on Sunday..."
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : theme.button
          }`}
        >
          {loading ? "Publishing..." : "Publish Announcement"}
        </button>
      </div>
    </form>
  );
};

export default AdminAnnouncementForm;
