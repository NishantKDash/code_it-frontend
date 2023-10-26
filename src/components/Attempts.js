import React, { useEffect, useState } from "react";
import GetAllAttempts from "../apis/GetAllAttempts";
import './Attempts.css'

const Attempts = () => {
  const [attempts, setAttempt] = useState();

  useEffect(() => {
    GetAllAttempts()
      .then((res) => {
        setAttempt(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="container">
      {attempts != null &&
        attempts.map((attempt, index) => {
          return (
            <div className= "container my-1 single_attempt" id={index}>
              <div className="row">
                <div className="col-sm">{attempt.id}</div>
                <div className="col-sm"> {attempt.status}</div>
                <div className="col-sm">{attempt.language}</div>
                <div className="col-sm">{attempt.timeStamp}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Attempts;
