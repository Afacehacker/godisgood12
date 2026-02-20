import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/signup" element={<AuthPage type="signup" />} />
              </Routes>
            </main>
            <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              &copy; 2026 SocialLink. All rights reserved.
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
