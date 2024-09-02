import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { apiRequest } from "../../lib/apiRequest";



function Register() {

  const [error, setError] = useState("")
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await apiRequest.post("/auth/register", {
       username,
       email,
       password 
      })

      navigate('/login')
    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>
            Create an Account
          </h1>
          <input name="username" minLength={3} maxLength={20} required type="text" placeholder="Username" />
          <input name="email" required type="text" placeholder="Email" />
          <input name="password" minLength={3} required type="password" placeholder="Password" />
          <button >Register</button>
          {error && <spna> {error} </spna>}
          <Link to="/login">
            Do you have an account?
            
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
