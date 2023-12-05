import { useState } from "react";
import './signup.css'
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  async function register(ev) {


    ev.preventDefault();
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
      navigate('/login')
    }
    else if(response.status === 511){
      alert("User already exists");
    }
     else {
      alert("registration failed");
    }
  }
  return (
    <>
    <Navbar/>
    <div className="signup">
      <form onSubmit={register}>
        <h1>Sign Up</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
