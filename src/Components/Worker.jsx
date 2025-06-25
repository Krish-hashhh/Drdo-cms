import React, { useState, useEffect } from "react";
import "./Worker.css";

export default function Worker(){
  const [complaints, setComplaints] = useState([]);
  
  useEffect(() => {
    setComplaints([
      { id: 1, hostel: "SR Bhawan", block: "B", location: "Room", roomNumber: "225", desc: "Tube light not working", status: "Pending" },
      { id: 2, hostel: "Meera Bhawan", location: "Toilet", toilet: "T4", desc: "Water leakage", status: "Pending" },
    ]);
  }, []);

  const updateStatus = (id, status) => 
    setComplaints(cs => cs.map(c => c.id === id ? { ...c,status} : c));

  return (
    <div className="worker-container">
        <h2>Worker Complaint Dashboard</h2>
        <ul className="complaint-list">
            {complaints.map(c => {
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
             </div>
             {c.status==="Pending" && (
             <div className="followup-section">
                <button className="completedbtn" onClick={() => updateStatus(c.id, "Completed") }>
                     Mark Completed
                </button>
                      
                <button className="rejectbtn"onClick={() => updateStatus(c.id, "Rejected")}>
                    Mark Rejected
                </button>
             </div>
             )}
            </li>
            );
            })}
  
      </ul>
    </div>
  );
}
