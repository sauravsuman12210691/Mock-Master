import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import R from "./Register.module.css";
import pic from "/image.png";
import background from "/Background.png";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!email) {
      valid = false;
      formErrors["email"] = "Email is required";
    } 

    if (!password) {
      valid = false;
      formErrors["password"] = "Password is required";
    }
    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("https://mock-master-9dhj.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ name,email, password }),
        });

        const data = await response.json();
        console.log(data);  

        if (data.success) {
         
          navigate("/login");

          // Perform further actions (e.g., redirecting to another page)
        } 
      } catch (error) {
        setMessage(`REgister failed: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={R.qote}>
        <div>
          <div className={R.bac}>
            <img src={background} height={500} alt="" />
          </div>
          <p className={R.qotefront}>Sign up to </p>
          <p className={R.qotefront}> Recharge Direct</p>
          <p className={R.qotefront1}>if you have an account </p>
          <p className={R.qotefront1}>
            {" "}
            You can <Link to="/Login">Login Here</Link>
          </p>
        </div>
        <img src={pic} alt="" height={500} />
      </div>
      <div className={R.form}>
        <form onSubmit={handleSubmit}>
        <div>
            <input
              className={R.name}
              type="text"
              placeholder="Enter Your Name"
              value={name}
              
              onChange={(e) => setName(e.target.value)}
            />
            
          </div>
          <div>
            <input
              className={R.email}
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <input
              type="password"
              className={R.password}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          
          <p className={R.recov}>Login?</p>
          <button className={R.sigupbtn} type="submit">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
