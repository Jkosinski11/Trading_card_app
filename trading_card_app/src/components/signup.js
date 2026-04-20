import { useState } from "react";
import { useNavigate } from "react-router-dom"


// Function to test that password contains a capital letter and number
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
    <div className="form">
      <div className="d-flex justify-content-between mb-3">
      <h2 className="fw-bold mb-0 text-center">Signup</h2>
      <button className= "btn-close" onClick={() => navigate("/")}></button>
      </div>
      <form onSubmit={handleSignup}>
      <div className="form-group">
        <label for="exampleFormControlInput1">Email address</label>
        <input
          id="exampleFormControlInput1"
          className="form-control"
          type="email"
          placeholder="name@example.com"
          value={email}
          maxLength={30}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
        <div className="form-group">
        <label for="exampleFormControlInput2">Confirm Email address</label>
        <input
          id="exampleFormControlInput2"
          className="form-control"
          type="email"
          placeholder="Confirm email"
          value={emailConfirm}
          maxLength={30}
          onChange={(e) => setEmailConfirm(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label for="exampleFormControlInput3">Password</label>
        <input
          id="exampleFormControlInput3"
          className="form-control"
          type="password"
          placeholder="Minimum 8 characters must have uppercase and number"
          value={password}
          maxLength={20}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label for="exampleFormControlInput4">Confirm Password</label>
        <input
        id="exampleFormControlInput4"
         className="form-control"
          type="password"
          placeholder="Confirm password"
          value={passwordConfirm}
          maxLength={20}
          minLength={8}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
        <label for="exampleFormControlInput5">Username</label>
        <input
          id="exampleFormControlInput5"
          className="form-control"
          type="text"
          placeholder="Enter Username"
          value={username}
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
        <button type="submit" className = "btn btn-primary">Signup</button>
        
      </form>
    </div>
  );
};

export default Signup;
