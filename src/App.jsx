import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Routes/ProtectedRoute";

import HomePage from "./Pages/HomePage";
import BookPage from "./Pages/BookPage";
import AllReviews from "./Pages/AllReviews";

import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

import AdminLayout from "./Layouts/AdminLayout";
import LibrarianLayout from "./Layouts/LibrarianLayout";
import UserLayout from "./Layouts/UserLayout";

import AdminOverview from "./Pages/Admin/AdminOverview";
import BookManagement from "./Pages/Admin/BookManagement";
import AdminUserManagement from "./Pages/Admin/AdminUserManagement";
import ReviewManagement from "./Pages/Admin/ReviewManagement";
import AdminAnnouncements from "./Pages/Admin/AdminAnnouncements";

import UserDashboard from "./Pages/User/UserDashboard";
import MyBooks from "./Pages/User/MyBooks";
import MyReviews from "./Pages/User/MyReviews";
import Announcements from "./Pages/Announcements";
import CheckoutBooks from "./Pages/Librarian/CheckoutBooks";
import ProcessReturns from "./Pages/Librarian/ProcessReturns";
import LibrarianAnnouncements from "./Pages/Librarian/LibrarianAnnouncements";
import BorrowRequests from "./Pages/Librarian/BorrowRequests";
import MyReservations from "./Pages/User/MyReservations";
import BorrowHistory from "./Pages/User/BorrowHistory";
import ResetPassword from "./Pages/Auth/ResetPassword";
import AdminAnalytics from "./Pages/Admin/AdminAnalytics";
import LibrarianOverview from "./Pages/Librarian/LibrarianOverview";

const App = () => {
  const location = useLocation();
  const { user } = useAuth();

  /* 🔥 HIDE NAVBAR FOR ADMIN & LIBRARIAN */
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/librarian");

  /* FOOTER LOGIC (UNCHANGED, BUT SAFE) */
  const showFooterRoutes = ["/", "/books", "/reviews/all", "/announcements"];
  const showFooter =
    showFooterRoutes.includes(location.pathname) &&
    (!user || user.role === "user");

  return (
    <>
      {/* ✅ Navbar ONLY for public & user pages */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<h1>403 Access Denied</h1>} />

        {/* ================= PUBLIC ACCESS ================= */}
        <Route path="/books" element={<BookPage />} />
        <Route path="/reviews/all" element={<AllReviews />} />
        <Route path="/announcements" element={<Announcements />} />

        {/* ================= USER ================= */}
        <Route element={<ProtectedRoute roles={["user"]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="my-books" element={<MyBooks />} />
            <Route path="reservations" element={<MyReservations />} />
            <Route path="history" element={<BorrowHistory />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Route>

        {/* ================= ADMIN ================= */}
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="book-management" element={<BookManagement />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="analytics" element={<AdminAnalytics/>}/>
          </Route>
        </Route>

        {/* ================= LIBRARIAN ================= */}
        <Route element={<ProtectedRoute roles={["librarian"]} />}>
          <Route path="/librarian" element={<LibrarianLayout />}>
            <Route index element={<CheckoutBooks/>}/>
            <Route path="borrow-request" element={<BorrowRequests />} />
            <Route path="returns" element={<ProcessReturns />} />
            <Route path="announcements" element={<LibrarianAnnouncements />} />
          </Route>
        </Route>
      </Routes>

      {/* ✅ Footer only for public/user pages */}
      {showFooter && <Footer />}
    </>
  );
};

export default App;
