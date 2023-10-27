import React, { useEffect, useState } from "react";
import GetAllAttempts from "../apis/GetAllAttempts";
import './Attempts.css'
import GetPaginatedAttempts from "../apis/GetPaginatedAttempts";

const Attempts = () => {
  // const [attempts, setAttempt] = useState();

  const [attempt, setAttempt] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0); 

  useEffect(() => {
    GetPaginatedAttempts(page,pageSize)
      .then((res) => {
        setAttempt(res.data.content);
        setTotalPages(res.data.totalPages)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, pageSize]);
  return (
    <div className="container">
      {attempt != null &&
        attempt.map((attempt, index) => {
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

           <button className='btn btn-primary my-2' onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
           <button className='btn btn-primary mx-2' onClick={() => setPage(page + 1)} disabled={page === totalPages-1}>Next</button>
    </div>
  );
};

export default Attempts;
