import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen luxury-gradient text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={!user ? <Landing /> : (user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />)} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/student" element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
