import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import GetQuestions from '../apis/GetQuestions';
import DeleteQuestion from '../apis/DeleteQuestion';

const Questions = () => {

  let [questions,setQuestion] = useState([{}])
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

  function addQuestion()
  {
    navigate('/addQuestion');
  }



  return (
    <div className='container'>
       {questions.map(function (question , index) {
        return (
       
          <div key={index} style={{background:'#7a736b'}} className="row my-1">
            <div style={{color:'white'}}  className="col-sm">
              {question.qid}
            </div>
            <div style={{color:'white'}} className="col-6">
              {question.title}
            </div>
            <div className='col-1'><button className='btn btn-danger my-1' onClick={()=>{
                DeleteQuestion(question.qid).then(res=>{alert(res.data);
                  setQuestion(
                  questions.filter(que=>{
                    return que.qid != question.qid; 
                  }))
                }).catch(e=>{
                  console.log(e)
                })
            }}>Delete</button></div>
         
          </div>
       
        );
      })}

      <button className="btn btn-primary my-3" onClick={addQuestion}>Add Question</button>
    </div>
  )
}

export default Questions