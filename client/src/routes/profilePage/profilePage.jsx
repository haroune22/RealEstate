import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useState, useTransition } from "react";
import { apiRequest } from "../../lib/apiRequest";

function ProfilePage() {

  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      startTransition(async () => {
        const res = await apiRequest.post("/auth/logout");

        //setting userInfo in the local storage and rediercting him to the home page
        localStorage.removeItem("user")
        // console.log(res.data)
        navigate('/login')
      })

    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
            <button 
              onClick={handleLogout}
              disabled={pending}
            >
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
