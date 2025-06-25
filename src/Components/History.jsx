import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './History.css';

function History() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const sampleComplaints = [
      {
        id: 1,
        hostel: "Srinivas Ramanujan Bhawan",
        block: "B",
        location: "Room",
        roomNumber: "225",
        description: "The tube light is not working.",
        status: "Processing"
      },
      {
        id: 2,
        hostel: "Meera Bhawan",
        block: "3",
        location: "Toilet",
        toilet: "T4",
        description: "Water leakage in Toilet T4.",
        status: "Accepted"
      },
      {
        id: 3,
        hostel: "Vishwakarma Bhawan",
        location: "Corridor",
        corridor: "C",
        description: "Corridor lights not turning on.",
        status: "Rejected"
      },
      {
        id: 4,
        hostel: "Srinivas Ramanujan Bhawan",
        block: "B",
        location: "Room",
        roomNumber: "225",
        description: "The tube light is not working.",
        status: "Processing"
      },
      {
        id: 5,
        hostel: "Meera Bhawan",
        block: "3",
        location: "Toilet",
        toilet: "T4",
        description: "Water leakage in Toilet T4.",
        status: "Accepted"
      },
      {
        id: 6,
        hostel: "Vishwakarma Bhawan",
        location: "Corridor",
        corridor: "C",
        description: "Corridor lights not turning on.",
        status: "Rejected"
      }
    ];

    setComplaints(sampleComplaints);
  }, []);

  return (
    <div className="history-container">
      <div className="center-button">
        <Link to="/complaint">
          <button className="nav-btn">Go to Complaint Form</button>
        </Link>
      </div>
      <h2>Your Complaint History</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul className="complaint-list">
          {complaints.map((comp) => (
            <li key={comp.id} className={`complaint-card ${comp.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="status-tag">{comp.status}</span>
              </div>
              <div className="card-body">
                <p><strong>Hostel:</strong> {comp.hostel}</p>
                {comp.block && <p><strong>Block:</strong> {comp.block}</p>}
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
  );
}

export default History;
