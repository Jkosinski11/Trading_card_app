import React, {useState} from "react";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");

    const handleSignup = async (e) => {
  e.preventDefault();
  console.log("Signup email:", email, "username", username);

  try {
    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username
      })
    });

    console.log("Response status:", response.status);

    const text = await response.text();
    console.log("Raw response:", text);

    const data = text ? JSON.parse(text) : {};

    if (response.ok) {
      alert("success");
    } else {
      alert(data.error || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Frontend error: " + error.message);
  }
};
        

    return (
     <div>
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
            <input
            type = "email"
            placeholder = "Enter email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type = "email"
            placeholder = "Confirm email"
            value = {emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            required
            />
            <input
            type = "password"
            placeholder = "Enter password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <input
            type = "password"
            placeholder = "Confirm password"
            value = {passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            />
            <input
            type = "text"
            placeholder = "Enter Username"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <button type ="submit">Signup</button>
        </form>
     </div>

    );
}

export default Signup;