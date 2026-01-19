import { useEffect, useState, useCallback } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../Services/userApi";
import SearchFilterUsers from "../../Components/admin/SearchFilterUsers";
import Pagination from "../../Components/Pagination";
import { roleTheme } from "../../../Utils/roleTheme";

const PAGE_LIMIT = 5;

const AdminUserManagement = () => {
  const theme = roleTheme.admin;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [roleMenuUser, setRoleMenuUser] = useState(null);

 
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleFilter = useCallback((data) => {
    setPage(1);
    setFilteredUsers(data);
  }, []);


  const start = (page - 1) * PAGE_LIMIT;
  const paginatedUsers = filteredUsers.slice(start, start + PAGE_LIMIT);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      setRoleMenuUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

     
      <SearchFilterUsers users={users} onFilter={handleFilter} />

     
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Member Since</th>
              <th className="px-6 py-3 text-left">Activity</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
              
                <td className="px-6 py-4 flex items-center gap-3">
                  <div
                    className={`${theme.bgLight} h-10 w-10 rounded-full flex items-center justify-center font-bold ${theme.text}`}
                  >
                    {u.name?.[0]}
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {u.phone || "N/A"}
                </td>
              
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.badge}`}
                  >
                    {u.role}
                  </span>
                </td>

              
                <td className="px-6 py-4">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

                
                <td className="px-6 py-4 text-xs space-y-1">
                  <p>{u.activity?.borrowed || 0} total borrows</p>
                  <p className="text-green-600">
                    {u.activity?.active || 0} active
                  </p>
                  <p className="text-red-600">
                    {u.activity?.overdue || 0} overdue
                  </p>
                  <p className="text-purple-600">
                    {u.activity?.reservations || 0} reservations
                  </p>
                </td>

                
                <td className="px-6 py-4 text-center relative">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() =>
                        setRoleMenuUser(roleMenuUser?._id === u._id ? null : u)
                      }
                      className={`${theme.text}`}
                    >
                      <FaUserShield />
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {roleMenuUser?._id === u._id && (
                    <div className="absolute right-6 top-12 bg-white border rounded-lg shadow z-20 w-40">
                      {["user", "librarian", "admin"].map((role) => (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(u._id, role)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Set as {role}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center py-6 text-gray-500">No users found</p>
        )}
      </div>

    
      <Pagination
        total={filteredUsers.length}
        page={page}
        setPage={setPage}
        limit={PAGE_LIMIT}
      />
    </div>
  );
};

export default AdminUserManagement;
