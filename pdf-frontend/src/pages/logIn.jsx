import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import './login.css'
import Navbar from "../components/navbar";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(" ");
  const [redirect, setRedirect] = useState(false);
  
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        localStorage.setItem("Profile", JSON.stringify({ userInfo }));
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
    <Navbar/>
    <div className="login">
      <form onSubmit={login}>
        <h1>Login</h1>
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
        <button>Login</button>
      </form>
    </div>
    </>
  );
};

export default LogIn;
