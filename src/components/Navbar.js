import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import jwtDecode from "jwt-decode";
import { useUser } from "../context/UserContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const {name , role , setRole , setName} = useUser()

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const token = jwtDecode(localStorage.getItem("token"))
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if(token.exp > currentTimestamp)
      {
        setName(token.username)
        setRole(token.authorities)
      }
    }
  }, []);
  

  function handleLogout() {
    localStorage.clear();
    setName("User")
    setRole("PUBLIC")
    navigate("/logout");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            Code_It
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-dp">
                <button
                  className="nav-link active"
                  aria-current="page"
                >
                  Hi {name}
                </button>
              </li>

              { role === 'ADMIN' && <li className="nav-item">
                <Link
                  className="nav-link actoive navbutton"
                  aria-current="page"
                  to="/admin/questions"
                >
                  View And Add Questions
                </Link>
              </li>}

              { role === 'STUDENT' && <li className="nav-item">
                <Link
                  className="nav-link actoive navbutton"
                  aria-current="page"
                  to="/student/questions"
                >
                  Practice
                </Link>
              </li>}

             { role === 'PUBLIC' && <li className="nav-item">
                <Link
                  className="nav-link actoive navbutton"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>}

              { role !== 'PUBLIC' && 
                <li className="nav-item">
                  <a className="nav-link navbutton" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
