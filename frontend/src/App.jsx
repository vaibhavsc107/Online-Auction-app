import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import AuctionItem from './components/AuctionItem';
import PostAuction from './components/PostAuction';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to check authentication
  const updateAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  };

  // Check authentication status on mount
  useEffect(() => {
    updateAuthStatus();
    
    // Listen for storage changes (logout in another tab)
    window.addEventListener('storage', updateAuthStatus);
    return () => window.removeEventListener('storage', updateAuthStatus);
  }, []);   // Re-run when authentication state changes



  return (
    <div >
      <header>
        <h1>Online Auction Platform</h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>

            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/post-auction" className="nav-link">Post Auction</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register updateAuthStatus={updateAuthStatus} />} />
          <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auction/:id" element={<AuctionItem />} />
          <Route path="/post-auction" element={<PostAuction />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
