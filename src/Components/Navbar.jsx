import React from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {


    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

    const publicRoutes = ['/', '/login', '/register'];
    const isPublic = publicRoutes.includes(location.pathname);

    return(
        <nav className="navbar">
            <div className = "logo">CPMS</div> 
            <ul className="nav-links">
                <li><a href="/" >Home</a></li>
                {isPublic ? (
                <li><a href="/login">Login</a></li>
                ) : (
                <li><a href="#" onClick={handleLogout}>Logout</a></li>
        )}
            </ul> 

            </nav>
    );
}

export default Navbar;