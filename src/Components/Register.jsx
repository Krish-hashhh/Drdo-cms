import React,{useState} from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";


function Register(){
    const [formData, setFormData]= useState({
        name:"",
        email:"",
        hostel:"",
        room:"",
        phone:"",
        password:""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

      const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, hostel, room, phone, password } = formData;

  if (!name || !email || !hostel || !room || !phone || !password) {
    setError("Please fill all the required fields.");
    setSuccess("");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1000);
  } catch (err) {
    setError("Something went wrong. Please try again later.");
    setSuccess("");
  }
};



    return(
        <div className="register-whole">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <div className="wrapper">
                        <input 
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Email</label>
                    <div className="wrapper">
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Hostel</label>
                    <div className="wrapper">
                        <input 
                        type="text"
                        name="hostel"
                        id="hostel"
                        value={formData.hostel}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Room Number</label>
                    <div className="wrapper">
                        <input 
                        type="text"
                        name="room"
                        id="room"
                        value={formData.room}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Phone</label>
                    <div className="wrapper">
                        <input 
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>

                 <div className="input-group">
                    <label htmlFor="name">Password</label>
                    <div className="wrapper">
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit" className="register-btn">Register</button>

               

            </form>
        

        </div>
     

    );
}

export default Register;