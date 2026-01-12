import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">LibraryHub</h3>
          <p className="text-sm">
            A modern library management system designed to simplify
            book inventory, borrowing, reservations, reviews, and announcements.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Browse Books</Link></li>
            <li><Link to="/reviews">All Reviews</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
            <li><Link to="/profile">My Account</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Contact Librarian</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Info</h3>
          <p className="text-sm">📍 City Central Library, India</p>
          <p className="text-sm">📧 support@libraryhub.com</p>
          <p className="text-sm">📞 +91 9XXXXXXXXX</p>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm">
        © 2025 LibraryHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
