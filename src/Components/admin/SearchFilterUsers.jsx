import { useState } from "react";
import { FaSearch, FaUserTag } from "react-icons/fa";

const SearchFilterUsers = ({ users, onFilter }) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const applyFilter = (searchValue, roleValue) => {
    let filtered = [...users];

    if (searchValue) {
      filtered = filtered.filter(
        (u) =>
          u.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (roleValue !== "all") {
      filtered = filtered.filter((u) => u.role === roleValue);
    }

    onFilter(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    applyFilter(value, role);
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRole(value);
    applyFilter(search, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm">

      <div className="relative w-full md:w-3/4">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
          className="border pl-10 pr-4 py-2 rounded-lg w-full"
        />
      </div>

      <div className="relative w-full md:w-1/4">
        <FaUserTag className="absolute left-3 top-3 text-gray-400" />
        <select
          value={role}
          onChange={handleRoleChange}
          className="border pl-10 pr-4 py-2 rounded-lg w-full"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterUsers;
