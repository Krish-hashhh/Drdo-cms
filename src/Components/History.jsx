import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './History.css';

function History() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("/api/complaints/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
           const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComplaints(data);
        } else {
          setError(data.message || "Failed to load complaints.");
        }
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setError("Something went wrong. Please try again.");
      });
  }, [navigate]);

  return (
    <div className="fullscreen">
      <div className="history-container">
        <div className="center-button">
          <Link to="/complaint">
            <button className="nav-btn">Go to Complaint Form</button>
          </Link>
        </div>
        <h2>Your Complaint History</h2>

        {error && <p className="error-message">{error}</p>}

        {complaints.length === 0 && !error ? (
          <p>No complaints found.</p>
        ) : (
          <ul className="complaint-list">
            {complaints.map((comp) => (
              <li key={comp._id} className={`complaint-card ${comp.status?.toLowerCase()}`}>
                <div className="card-header">
                  <span className="status-tag">{comp.status}</span>
                </div>
                <div className="card-body">
                  <p><strong>Hostel:</strong> {comp.hostel}</p>
                  {comp.block && <p><strong>Block:</strong> {comp.block}</p>}
                  {comp.block1 && <p><strong>Block:</strong> {comp.block1}</p>}
                  <p><strong>Location:</strong> {comp.location}</p>
                  {comp.roomNumber && <p><strong>Room Number:</strong> {comp.roomNumber}</p>}
                  {comp.toilet && <p><strong>Toilet:</strong> {comp.toilet}</p>}
                  {comp.corridor && <p><strong>Corridor:</strong> {comp.corridor}</p>}
                  {comp.qt && <p><strong>QT:</strong> {comp.qt}</p>}
                  <p><strong>Complaint:</strong> {comp.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
