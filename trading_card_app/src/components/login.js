import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("success");
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        navigate("/card_page");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">CARD SHOP</h1>
      <h4 className="text-center">Login</h4>
      <form onSubmit={handleLogin}>
        <div className="form-group">
        <label for="email">Email address</label>
        <input
          id = "email"
          className="form-control"
          type="email"
          placeholder="Enter email"
          value={email}
          maxLength={30}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label for="password">Password</label>
        <input
          id = "password"
          className="form-control"
          type="password"
          placeholder="Enter password"
          value={password}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="d-flex gap-2">
        <button className = "btn btn-primary" type="submit">Login</button>
        <button className = "btn btn-primary" type = "button" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
