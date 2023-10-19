import React, { useState } from "react";
import Notification from "./Notification";
import { useNavigate, Link } from "react-router-dom";
import LoginUser from "../apis/LoginUser";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useUser } from "../context/UserContext";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(-1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {setName , setRole} = useUser()

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if(jwtDecode(localStorage.getItem("token")).exp > currentTimestamp)
      navigate("/");
    }
  }, []);
  function handlePChange(e) {
    setUsername(e.target.value);
  }

  async function handleSubmit() {
    let user = { username: username, password: password };
    try {
      const response = await LoginUser(user);
      if (response.status === 200) {
        setFlag(1);
        setMessage("Authenticated!");
        localStorage.setItem("token", response.data.token);
        var token = jwtDecode(localStorage.getItem("token"))
        setName(token.username)
        setRole(token.authorities)
        navigate(`/`);
      } else {
        setFlag(0);
        setMessage("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
      if (e.response.status === 403) {
        setFlag(0);
        setMessage("UserId or password wrong");
        console.log(e);
      } else {
        console.log(e);
        setMessage(e.message);
        setFlag(0);
      }
    }
  }

  return (
    <div className="container">
      <form className="p-3 mb-2 bg-secondary text-white col-md-20">
        <div className="container mb-5 mt-5">
          <h1 className="fw-bold">Login</h1>
        </div>

        <div className="container mt-10">
          <input
            type="text"
            className="form-control w-25 p-2 container my-3"
            id="username"
            placeholder="UserName"
            onChange={handlePChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control w-25 p-2 container"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="container">
          <Link to="/register">Sign-Up</Link>
        </div>

        <Notification flag={flag} message={message}></Notification>
      </form>
    </div>
  );
};

export default Login;
