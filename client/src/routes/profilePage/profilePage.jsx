import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useContext, useEffect, useState, useTransition } from "react";
import { apiRequest } from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {

  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  const { updateUser, currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [currentUser, navigate])

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      startTransition(async () => {
        await apiRequest.post("/auth/logout");

        //setting userInfo in the local storage and rediercting him to the home page
        updateUser(null)
        navigate('/login')
      })

    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error)
    }
  }

  return (
    currentUser && (
      <>
        <div className="profilePage">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1>
                  User Information
                </h1>
                <Link to='/profile/update'>
                  <button>
                    Update Profile
                  </button>
                </Link>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img
                    src={currentUser.avatar || "/noavatar.jpg"}
                    alt=""
                  />
                </span>
                <span>
                  Username:
                  <b> {currentUser.username} </b>
                </span>
                <span>
                  E-mail:
                  <b> {currentUser.email} </b>
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
                <Link to="/add">
                  <button>
                    Create New Post
                  </button>
                </Link>
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
      </>
    )
  );
}

export default ProfilePage;
