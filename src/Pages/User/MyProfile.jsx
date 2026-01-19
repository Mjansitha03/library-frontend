import { useEffect, useState } from "react";
import UserProfileCard from "../../Components/user/UserProfileCard";
import UserStatusBoard from "../../Components/user/UserStatusBoard";
import { getMyProfile, updateMyProfile } from "../../Services/userProfileApi";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getMyProfile();
    setUser(res.data);
  };

  const handleUpdate = async (data) => {
    await updateMyProfile(data);
    loadProfile();
  };

  if (!user) return null;

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex justify-center">
        <UserProfileCard user={user} onUpdate={handleUpdate} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center sm:text-left">
          My Library Activity
        </h3>
        <UserStatusBoard />
      </div>
    </div>
  );
};

export default MyProfile;
