import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import GetQuestions from '../apis/GetQuestions';

const Questions = () => {

  let [question,setQuestion] = useState([{}])
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if(jwtDecode(localStorage.getItem("token")).exp <= currentTimestamp)
      navigate("/login");
      else
      {
        GetQuestions()
        .then(
          (response)=>{
            setQuestion(response.data)
          }
        )
        .catch(e => {console.log(e)});
      }
    }
    else
    navigate("/login")
  }, []);


  return (
    <div className='container'>
       {question.map(function (question , index) {
        return (
       
          <div key={index} style={{background:'#7a736b'}} className="row my-1">
            <div style={{color:'white'}}  className="col-sm">
              {question.qid}
            </div>
            <div style={{color:'white'}} className="col-sm">
              {question.title}
            </div>
            
          </div>
       
        );
      })}

      <button className="btn btn-primary my-3">Add Question</button>
    </div>
  )
}

export default Questions