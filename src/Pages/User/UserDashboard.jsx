import { useAuth } from "../../Context/AuthContext";
import UserStatusBoard from "../../Components/user/UserStatusBoard";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">
        Welcome, {user?.name} 👋
      </h2>
      <UserStatusBoard />
    </div>
  );
};

export default UserDashboard;


