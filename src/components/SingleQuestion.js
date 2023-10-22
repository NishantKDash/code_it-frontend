import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GetSingleQuestion from "../apis/GetSingleQuestion";

const SingleQuestion = () => {
 const navigate = useNavigate()
  const param = useParams();
  const [question,setQuestion] = useState({})
  //param.qid

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if(jwtDecode(localStorage.getItem("token")).exp <= currentTimestamp)
      navigate("/login");
     
     GetSingleQuestion(param.qid).then(
        (res)=>{
           setQuestion(res.data)
        }
     ).catch((e)=>{
        console.log(e)
     }); 

    }
    else
    navigate("/login")
    
  }, []);
  return <div>{question.title}</div>;
};

export default SingleQuestion;
