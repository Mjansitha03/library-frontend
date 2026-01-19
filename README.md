# Library Management System Frontend

This is the frontend part of a Library Management System. It helps users, librarians, and admins manage books, borrow requests, reviews, and more. Built with React and modern web tools.

## Features

### For Users
- Sign up and sign in
- Browse and search books
- Borrow books
- Return books
- Make reservations
- Write reviews and ratings
- View borrow history
- Manage profile
- Get notifications

### For Librarians
- Handle borrow requests
- Process returns
- Manage overdue books
- Create announcements
- View reservations

### For Admins
- Manage books (add, edit, remove)
- Manage users
- Moderate reviews
- View analytics and reports
- Create admin announcements

### General Features
- Announcements for all users
- Notification system
- Responsive design (works on mobile and desktop)

## Tech Stack

- **React**: For building the user interface
- **Vite**: For fast development and building
- **Tailwind CSS**: For styling
- **React Router**: For navigation
- **Axios**: For API calls
- **Framer Motion**: For animations
- **React Toastify**: For notifications
- **Recharts**: For charts in analytics
- **ESLint**: For code quality

## Installation

1. Make sure you have Node.js installed (version 16 or higher).

2. Clone or download this project.

3. Open a terminal in the project folder.

4. Install dependencies:
   ```
   npm install
   ```

## Usage

### Development
To start the development server:
```
npm run dev
```
This will open the app in your browser at `http://localhost:5173`.


## Project Structure

```
src/
├── Components/          # Reusable UI parts
│   ├── admin/          # Admin-specific components
│   ├── announcements/  # Announcement components
│   ├── books/          # Book-related components
│   ├── librarian/      # Librarian components
│   ├── notification/   # Notification components
│   ├── user/           # User components
│   ├── Footer.jsx      # Footer component
│   ├── Navbar.jsx      # Navigation bar
│   └── Pagination.jsx  # Pagination component
├── Context/            # React contexts for state
│   ├── AuthContext.jsx
│   ├── AuthProvider.jsx
│   ├── NotificationContext.jsx
│   └── NotificationProvider.jsx
├── Layouts/            # Layout components for different roles
│   ├── AdminLayout.jsx
│   ├── LibrarianLayout.jsx
│   └── UserLayout.jsx
├── Pages/              # Main page components
│   ├── Admin/          # Admin pages
│   ├── Auth/           # Authentication pages
│   ├── Librarian/      # Librarian pages
│   ├── User/           # User pages
│   ├── AllReviews.jsx
│   ├── Announcements.jsx
│   ├── BookPage.jsx
│   ├── HomePage.jsx
│   └── PageNotFound.jsx
├── Routes/             # Routing logic
│   └── ProtectedRoute.jsx
├── Services/           # API service functions
│   ├── adminAnalyticsApi.js
│   ├── adminApi.js
│   ├── announcementApi.js
│   ├── Api.js
│   ├── authApi.js
│   ├── bookApi.js
│   ├── borrowApi.js
│   ├── borrowRequestApi.js
│   ├── notificationApi.js
│   ├── overdueApi.js
│   ├── paymentApi.js
│   ├── reservationApi.js
│   ├── reviewApi.js
│   ├── userApi.js
│   ├── userProfileApi.js
│   └── userStatsApi.js
├── Utils/              # Utility functions
│   └── roleTheme.js
├── App.jsx             # Main app component
├── index.css           # Global styles
└── main.jsx            # App entry point
```

## Deployment

This app is set up for deployment on Vercel. The `vercel.json` file handles routing for a single-page application.

## Contributing

1. Follow the code style (ESLint rules).
2. Test your changes.
3. Make sure the app builds without errors.

## License

This project is private.