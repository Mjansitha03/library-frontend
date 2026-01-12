import { useEffect, useState } from "react";
import Api from "../../Services/Api";
import LibrarianStatusBoard from "../../Components/librarian/LibrarianStatusBoard";
import { motion } from "framer-motion";

const LibrarianOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await Api.get("/librarian/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Librarian overview error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow animate-pulse">
        Loading overview...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold">Librarian Overview</h1>
      <LibrarianStatusBoard stats={stats} />
    </motion.div>
  );
};

export default LibrarianOverview;
