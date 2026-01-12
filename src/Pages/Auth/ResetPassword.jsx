import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../Services/Api";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(null);
  const [expires, setExpires] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-reset/${id}/${token}`);
        setValid(true);
        setExpires(res.data.expiresInSeconds || 60);
      } catch (err) {
        setValid(false);
        setError(err.response?.data?.message || "Invalid or expired link");
      }
    };
    verify();
  }, [id, token]);

  useEffect(() => {
    if (!valid) return;
    const timer = setInterval(() => {
      setExpires((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setValid(false);
          setError("Reset link expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [valid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.warning("Password is required");
    if (password.length < 6)
      return toast.warning("Password must be at least 6 characters");

    try {
      const res = await api.post(`/auth/reset-password/${id}/${token}`, {
        password,
      });
      toast.success(res.data.message || "Password updated successfully");
      navigate("/sign-in");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Reset Password
        </h2>

        {valid === null && (
          <p className="text-center text-gray-500">Checking reset link...</p>
        )}

        {valid === false && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}

        {valid && (
          <>
            <p className="text-center text-green-600 mb-4 text-sm">
              Link expires in <strong>{expires}</strong> seconds
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
                >
                  {show ? <VscEyeClosed /> : <VscEye />}
                </button>
              </div>

              <button
                disabled={!valid}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold"
              >
                Update Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
