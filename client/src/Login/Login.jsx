import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Swal from "sweetalert2";
import '../Alert/SweetAlert.css';
import L from "./Login.module.css";
import pic from "/LoginPic1.png";
import background from "/Background.png";
const LoginForm = () => {
  const navigate = useNavigate();
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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      formErrors["email"] = "Email is invalid";
    }

    if (!password) {
      valid = false;
      formErrors["password"] = "Password is required";
    } else if (password.length < 6) {
      valid = false;
      formErrors["password"] = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Example of actual fetch API call
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.authentication) {
          setMessage("Login successful!");
          localStorage.setItem("auth-token", data.token);
          showSuccessAlert(); // Show SweetAlert2 success message
          navigate("/dashboard");
        } else {
          setMessage(`Login failed: ${data.message}`);
        }
      } catch (error) {
        setMessage(`Login failed: ${error.message}`);
      }
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'You are now logged in.',
      confirmButtonColor: '#4a90e2',
      timer: 5000, // Auto close after 5 seconds
      timerProgressBar: true,
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
        content: 'swal-content',
        confirmButton: 'swalconfirmbutton',
      }
    });
  };


  return (
    <>
      <div>
        <Navbar />
        <div className={L.qote}>
          <div>
            <div className={L.bac}>
              <img src={background} height={500} alt="" />
            </div>
            <p className={L.qotefront}>Sign In to </p>
            <p className={L.qotefront}> Recharge Direct</p>
            <p className={L.qotefront1}>if you don't have an account </p>
            <p className={L.qotefront1}>
              {" "}
              You can <Link to="/register">Register Here</Link>
            </p>
          </div>
          <img src={pic} alt="" height={300} />
        </div>
        <div className={L.form}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={L.email}
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
                className={L.password}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span>{errors.password}</span>}
            </div>
            <p className={L.recov}>Recover Password ?</p>
            <button className={L.siginbtn} type="submit">
              Sign In
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>



    </>

  );
};

export default LoginForm;
