import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "../assets/hero-image.png";
import { FaBell, FaBookmark, FaBookOpen, FaClock } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

import { getAnnouncements } from "../Services/announcementApi";
import { getAllApprovedReviews } from "../Services/reviewApi";

const HomePage = () => {
  const { user } = useAuth();

  const [announcements, setAnnouncements] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [annRes, revRes] = await Promise.all([
          getAnnouncements(),
          getAllApprovedReviews(),
        ]);

        setAnnouncements(annRes.data || []);
        setReviews(revRes.data || []);
      } catch (error) {
        console.error("Home page data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="hero"
        className="relative text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29,78,216,0.85), rgba(37,99,235,0.85)),
            url(${heroImage})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-28">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Library Management <br /> Made Easy
          </h1>

          <p className="max-w-xl text-lg mb-8">
            Manage books, borrow seamlessly, reserve instantly, and stay updated
            with reviews and announcements — all in one platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/books"
              className="bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-100 transition"
            >
              Explore Books →
            </Link>

            {!user && (
              <Link
                to="/sign-up"
                className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-2">Powerful Features</h2>
          <p className="text-gray-600">
            Everything you need for efficient library management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              icon: <FaBookOpen size={36} />,
              bg: "bg-blue-200",
              color: "text-blue-600",
              title: "Book Management",
              desc: "Browse, search, and manage books with availability tracking.",
            },
            {
              icon: <FaClock size={36} />,
              bg: "bg-green-200",
              color: "text-green-600",
              title: "Borrow & Return",
              desc: "Automated due dates, returns, and late fine calculations.",
            },
            {
              icon: <FaBookmark size={36} />,
              bg: "bg-purple-200",
              color: "text-purple-600",
              title: "Reservations",
              desc: "Reserve books and get notified when available.",
            },
            {
              icon: <FaBell size={36} />,
              bg: "bg-yellow-200",
              color: "text-yellow-600",
              title: "Smart Notifications",
              desc: "Real-time alerts for announcements and overdue books.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded shadow text-center hover:-translate-y-2 hover:shadow-xl transition"
            >
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${f.bg} ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-4">What Our Readers Say</h2>
          <p className="text-gray-600">
            Genuine reviews shared by our library members.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-3">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500">
              No reviews available
            </p>
          ) : (
            reviews.slice(0, 3).map((r) => (
              <div key={r._id} className="bg-gray-50 p-6 rounded-xl border">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-xl ${
                        idx < r.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-sm mb-2">
                  <strong>Book:</strong> {r.book?.title || "N/A"}
                </p>

                <p className="italic text-gray-600 mb-2">“{r.comment}”</p>

                <p className="text-xs text-gray-500">
                  — {r.user?.name || "Anonymous"}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/reviews/all"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Read All Reviews <FaArrowRight />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-4xl mb-4">Library Announcements</h2>
        <p className="text-gray-600 mb-10">
          Stay informed about new arrivals and updates.
        </p>

        <div className="space-y-6 max-w-2xl mx-auto text-left">
          {loading ? (
            <p className="text-center">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-center text-gray-500">
              No announcements available
            </p>
          ) : (
            announcements.slice(0, 1).map((a) => (
              <div
                key={a._id}
                className="flex gap-4 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-xl"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                  <FaBell />
                </div>

                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-gray-600">{a.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View All Announcements <FaArrowRight />
          </Link>
        </div>
      </section>

      {!user && (
        <section className="bg-gradient-to-b from-blue-500 to-blue-700 py-24 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-6">Join LibraryHub Today</h2>
          <p className="max-w-2xl mx-auto mb-10 text-blue-100">
            Create your account and enjoy a smarter library experience.
          </p>

          <button
            onClick={scrollToHero}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:bg-blue-50 transition"
          >
            Get Started <FaArrowRight />
          </button>
        </section>
      )}
    </>
  );
};

export default HomePage;
