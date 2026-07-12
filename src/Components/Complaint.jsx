import React, { useState } from "react";
import './Complaint.css';




function Complaint() {
  const [hostel, setHostel] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [block, setBlock] = useState("");
  const [block1, setBlock1] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [toilet, setToilet] = useState("");
  const [corridor, setCorridor] = useState("");
  const [qt, setQt] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const showBlockDropdown = hostel === "Srinivas Ramanujan Bhawan";
  const showBlockDropdown1 = hostel === "Meera Bhawan";

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const complaintData = {
      hostel,
      ...(showBlockDropdown && { block }),
      ...(showBlockDropdown1 && { block1 }),
      location,
      ...(location === "Room" && { roomNumber }),
      ...(location === "Toilet" && { toilet }),
      ...(location === "Corridor" && { corridor }),
      ...(location === "Qt" && { qt }),
      description,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(complaintData),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.error || "Failed to submit complaint.");
        return;
      }

      setSuccess("Complaint submitted successfully!");
   
      setHostel("");
      setBlock("");
      setBlock1("");
      setLocation("");
      setRoomNumber("");
      setToilet("");
      setCorridor("");
      setQt("");
      setDescription("");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fullscreen">
      <div className="complaint-container">
        <h2>Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>

          <label>Hostel</label>
          <select value={hostel} onChange={(e) => setHostel(e.target.value)} required>
            <option value="">Select Hostel</option>
          
            <option value="Srinivas Ramanujan Bhawan">Srinivas Ramanujan Bhawan</option>
            <option value="Meera Bhawan">Meera Bhawan</option>
            <option value="Vishwakarma Bhawan">Vishwakarma Bhawan</option>
            <option value="Ram Bhawan">Ram Bhawan</option>
            <option value="Budh Bhawan">Budh Bhawan</option>
            <option value="Bhageerath Bhawan">Bhageerath Bhawan</option>
            <option value="Krishna Bhawan">Krishna Bhawan</option>
            <option value="Gandhi Bhawan">Gandhi Bhawan</option>
            <option value="Rana Pratap Bhawan">Rana Pratap Bhawan</option>
            <option value="Ashok Bhawan">Ashok Bhawan</option>
            <option value="CV Raman Bhawan">CV Raman Bhawan</option>
            <option value="Malviya Bhawan">Malviya Bhawan</option>
            <option value="New Academic Block">New Academic Block</option>
            <option value="Forward Division 1">Forward Division 1</option>
            <option value="Forward Division 2">Forward Division 2</option>
            <option value="Forward Division 3">Forward Division 3</option>
            <option value="Lecture Theatre Complex">Lecture Theatre Complex</option>
            <option value="Student Activity Centre">Student Activity Centre</option>
            <option value="Library">Library</option>
          </select>

          {showBlockDropdown && (
            <>
              <label>Block</label>
              <select value={block} onChange={(e) => setBlock(e.target.value)} required>
                <option value="">Select Block</option>
                <option value="A">Block A</option>
                <option value="B">Block B</option>
                <option value="C">Block C</option>
                <option value="D">Block D</option>
              </select>
            </>
          )}

          {showBlockDropdown1 && (
            <>
              <label>Block</label>
              <select value={block1} onChange={(e) => setBlock1(e.target.value)} required>
                <option value="">Select Block</option>
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Block {i + 1}</option>
                ))}
              </select>
            </>
          )}

          <label>Complaint Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="">Detailed Location</option>
            <option value="Room">Room</option>
            <option value="Toilet">Toilet</option>
            <option value="Corridor">Corridor</option>
            <option value="Qt">QT</option>
          </select>

          {location === "Room" && (
            <>
              <label>Room Number</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Enter Room Number"
                required
              />
            </>
          )}

          {location === "Toilet" && (
            <>
              <label>Toilet Number</label>
              <select value={toilet} onChange={(e) => setToilet(e.target.value)} required>
                <option value="">Select Toilet</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`T${i + 1}`}>{`T${i + 1}`}</option>
                ))}
              </select>
            </>
          )}

          {location === "Corridor" && (
            <>
              <label>Corridor</label>
              <select value={corridor} onChange={(e) => setCorridor(e.target.value)} required>
                <option value="">Select Corridor</option>
                {"ABCDEFGHIJKLM".split("").map(letter => (
                  <option key={letter} value={letter}>Corridor {letter}</option>
                ))}
              </select>
            </>
          )}

          {location === "Qt" && (
            <>
              <label>QT Number</label>
              <select value={qt} onChange={(e) => setQt(e.target.value)} required>
                <option value="">Select QT</option>
                <option value="1">QT 1</option>
                <option value="2">QT 2</option>
              </select>
            </>
          )}

          <label>Describe the Issue</label>
          <textarea
            placeholder="Describe your complaint here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
}

export default Complaint;
