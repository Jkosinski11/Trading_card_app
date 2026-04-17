import '../styling/login.css';
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // place confirmation of backend logic here
    };

    return (
     <div>
        <h1>CARD SHOP</h1>
        <h2>Login Page</h2>
        <form onSubmit={handleLogin}>
            <input
            type = "email"
            placeholder = "Enter email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type = "password"
            placeholder = "Enter password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type ="submit">Login</button>
        </form>
        <button onClick = {() => navigate("/signup")}>
            Sign Up
        </button>
     </div>

    );
}

export default Login;