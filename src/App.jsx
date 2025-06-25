import React from 'react';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Complaint from './Components/Complaint';
import History from './Components/History';
import Admin from './Components/Admin';
import Worker from './Components/Worker';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App(){
    return(
        <Router>
            <div>
                <Navbar/>
            </div>
            <div>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/complaint" element={<Complaint />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/worker" element={<Worker />} />
               </Routes>
            </div>
            <div>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;