import React, { useState, useEffect } from "react";
import "./Worker.css";
import { useNavigate } from 'react-router-dom';


export default function Worker() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const workerRole = localStorage.getItem("role");

  useEffect(() => {
    if (workerRole !== "worker") {
      navigate("/");
    }
  }, [navigate, workerRole]);

useEffect(() => {
  const category = localStorage.getItem("category");
  if (!category) return;

  fetch(`/api/complaints/assigned/${category}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
    .then(res => res.json())
    .then(data => setComplaints(data))
    .catch(err => console.error(err));
  }, []);


  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/complaints/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status })
    });

    const updated = await res.json();
    setComplaints(prev =>
      prev.map(c => (c._id === updated._id ? updated : c))
    );
  };

  return (
    <div className="fullscreen">
      <div className="worker-container">
        <h2>Worker Complaint Dashboard</h2>
        <ul className="complaint-list">
          {complaints.map(c => (
            <li key={c._id} className={`complaint-card ${c.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="status-tag">{c.status}</span>
              </div>
              <div className="card-body">
                <p><strong>Hostel:</strong> {c.hostel}</p>
                {c.block && <p><strong>Block:</strong> {c.block}</p>}
                {c.block1 && <p><strong>Block:</strong> {c.block1}</p>}
                {c.location && <p><strong>Location:</strong> {c.location}</p>}
                {c.roomNumber && <p><strong>Room No:</strong> {c.roomNumber}</p>}
                {c.toilet && <p><strong>Toilet:</strong> {c.toilet}</p>}
                {c.corridor && <p><strong>Corridor:</strong> {c.corridor}</p>}
                {c.qt && <p><strong>QT:</strong> {c.qt}</p>}
                <p><strong>Description:</strong> {c.description}</p>
              </div>

              {c.status === "Assigned" && (
                <div className="followup-section">
                  <button
                    className="completedbtn"
                    onClick={() => updateStatus(c._id, "Completed")}
                  >
                    Mark Completed
                  </button>
                  <button
                    className="rejectbtn"
                    onClick={() => updateStatus(c._id, "Rejected")}
                  >
                    Mark Rejected
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
