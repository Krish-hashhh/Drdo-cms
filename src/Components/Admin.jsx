import React, { useEffect, useState } from "react";
import "./Admin.css";

const STAFF = ["Plumber", "Carpenter", "Electrician", "Cleaner"];

export default function AdminHistory() {
  const [complaints, setComplaints] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setComplaints([
      { id: 1, hostel: "SR Bhawan", block: "B", location: "Room", roomNumber: "225", desc: "Tube light not working", status: "Pending" },
      { id: 2, hostel: "Meera Bhawan", location: "Toilet", toilet: "T4", desc: "Water leakage", status: "Pending" },
    ]);
  }, []);

  const updateStatus = (id, status) =>
    setComplaints(cs => cs.map(c => c.id === id ? { ...c, status } : c));

  const toggleExpand = id =>
    setExpandedId(expandedId === id ? null : id);

  return (
    <div className="history-container">
      <h2>Admin Complaint Dashboard</h2>
      <ul className="complaint-list">
        {complaints.map(c => {
          const isExpanded = expandedId === c.id;
          return (
            <li key={c.id} className={`complaint-card ${c.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="status-tag">{c.status}</span>
              </div>
              <div className="card-body">
                <p><strong>Hostel:</strong> {c.hostel}</p>
                {c.block && <p><strong>Block:</strong> {c.block}</p>}
                {c.location && <p><strong>Location:</strong> {c.location}</p>}
                {c.roomNumber && <p><strong>Room No:</strong> {c.roomNumber}</p>}
                {c.toilet && <p><strong>Toilet:</strong> {c.toilet}</p>}
                <p><strong>Description:</strong> {c.desc}</p>

                {c.status === "Pending" && (
                  <div className="actions">
                    <button className="completedbtn" onClick={() => toggleExpand(c.id)}>
                      {isExpanded ? "Cancel" : "Accept"}
                    </button>
                    <button className="rejectbtn" onClick={() => updateStatus(c.id, "Rejected")}>
                      Reject
                    </button>
                  </div>
                )}

                {isExpanded && (
                  <div className="assign-section">
                    <h4>Assign Technician:</h4>
                    {STAFF.map(s => (
                      <button key={s} onClick={() => updateStatus(c.id, s) }>
                        {s}
                      </button>
                      
                    ))}

                    <div className="followup-section">
                      <button className="completedbtn" onClick={() => {updateStatus(c.id, "Completed"); toggleExpand(false);} }>
                        Mark Completed
                      </button>
                      
                      <button className="rejectbtn"onClick={() => {updateStatus(c.id, "Rejected"); toggleExpand(false);}}>
                        Mark Rejected
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
