import React,{useState} from "react";
import './Login.css';


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if(!email||!password){
            setError("Please fill all the required fields");
            return;
        }

        console.log("Logging in with",email);
        setError("");
    };

    return(
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <div className="email-wrapper">     
                      <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      />
                    </div>
                </div>
                 <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input
                        type={showPassword?"text":"password"} 
                        id="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        />
                        <button
                        type="button"
                        className="toggle-password"
                        onClick={()=>setShowPassword((prev)=>!prev)}
                        >
                            {showPassword?"On":"Off"}
                        </button>

                    </div>

                 </div>
                 {error && <p className="error-message">{error}</p>}
         

        <button type="submit" className="login-btn"><a className="log-a" href="/complaint">Login</a></button>
        <div className="Registeration-link">
        Not registered yet ? <span><a href="/register" >Click to register</a></span>
            </div>
            </form>
        </div>
    );

}

export default Login;