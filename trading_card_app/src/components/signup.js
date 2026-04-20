import { useState } from "react";
import { useNavigate } from "react-router-dom"
import '../styling/signup.css'

const validatePassword = (password) => {
  const error = [];
  if(!/[A-Z]/.test(password)){
    error.push("Password must contain at least one Uppercase");
  }
  if(!/[0-9]/.test(password)){
    error.push("Password must contain at least one number");
  }
  if(error.length !==0){
    alert(error);
  }
  
  return error;
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup email:", email, "username", username);

    try {
      if( email !== emailConfirm){
        alert("emails do not match");
        return;
      }
      if( password !== passwordConfirm){
        alert("passwords do not match");
        return;
      }

      if(validatePassword(password).length !==0){
        return;
      }

      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      });

      if (response.ok) {
        alert("success");
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="Signup-container">
      <h2>Signup</h2>
      <button onClick={() => navigate("/")}>X</button>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          maxLength={30}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Confirm email"
          value={emailConfirm}
          maxLength={30}
          onChange={(e) => setEmailConfirm(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          maxLength={20}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirm}
          maxLength={20}
          minLength={8}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        
      </form>
    </div>
  );
};

export default Signup;
