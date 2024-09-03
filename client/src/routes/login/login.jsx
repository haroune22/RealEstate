
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useTransition } from "react";
import { apiRequest } from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {

  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  
  const { currentUser, updateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get('username');
    const password = formData.get('password');

    try {
      startTransition(async () => {
        const res = await apiRequest.post("/auth/login", {
          username,
          password,
        });

        //setting userInfo in the local storage and rediercting him to the home page
        updateUser(res.data)
        // console.log(res.data)
        navigate('/')
      })

    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>
            Welcome back
          </h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={pending}>
            Login
          </button>
          {error && <spna> {error} </spna>}
          <Link to="/register">
            {"Don't"} you have an account?
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
