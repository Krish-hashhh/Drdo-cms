import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from 'react-router-dom';

const STAFF = ["Plumber", "Carpenter", "Electrician", "Cleaner"];

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate('/');
  }, [navigate]);


useEffect(() => {
 fetch('/api/complaints/admin', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data)) {
      setComplaints(data);
    } else {
      console.error("Expected array, got:", data);
      setComplaints([]); 
    }
  })
  .catch((err) => {
    console.error("Fetch failed:", err);
    setComplaints([]);
  });
}, []);



  const assignComplaint = async (id, staffType) => {
    const res = await fetch(`/api/complaints/${id}/assign`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ assignedTo: staffType })
    });

    const updated = await res.json();
    setComplaints(prev =>
      prev.map(c => (c._id === updated._id ? updated : c))
    );
    setExpandedId(null);
  };


  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/complaints/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status })
    });

    const updated = await res.json();
    setComplaints(prev =>
      prev.map(c => (c._id === updated._id ? updated : c))
    );
    setExpandedId(null);
  };

 
  const toggleExpand = id =>
    setExpandedId(expandedId === id ? null : id);

  return (
    <div className="fullscreen">
      <div className="history-container">
        <h2>Admin Complaint Dashboard</h2>
        <ul className="complaint-list">
          {complaints.map(c => {
            const isExpanded = expandedId === c._id;
            return (
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
                  <p><strong>Assigned To:</strong> {c.assignedTo || 'Not assigned'}</p>

                  {c.status === "Pending" && (
                    <div className="actions">
                      <button className="completedbtn" onClick={() => toggleExpand(c._id)}>
                        {isExpanded ? "Cancel" : "Assign"}
                      </button>
                      <button className="rejectbtn" onClick={() => updateStatus(c._id, "Rejected")}>
                        Reject
                      </button>
                    </div>
                  )}

                  {isExpanded && (
                    <div className="assign-section">
                      <h4>Assign Technician:</h4>
                      {STAFF.map(s => (
                        <button key={s} onClick={() => assignComplaint(c._id, s)}>
                          {s}
                        </button>
                      ))}

                      <div className="followup-section">
                        <button className="completedbtn" onClick={() => updateStatus(c._id, "Completed")}>
                          Mark Completed
                        </button>
                        <button className="rejectbtn" onClick={() => updateStatus(c._id, "Rejected")}>
                          Mark Rejected
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          }).reverse()}
        </ul>
      </div>
    </div>
  );
}
