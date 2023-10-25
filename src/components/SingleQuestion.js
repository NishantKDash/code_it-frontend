import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GetSingleQuestion from "../apis/GetSingleQuestion";
import "./SingleQuestion.css";
import { subscribeNotification } from "../websocket/Notification";
import { useUser } from "../context/UserContext";
import SubmitAttempt from "../apis/SubmitAttempt";

const SingleQuestion = () => {
  const navigate = useNavigate();
  const param = useParams();
  const {name} = useUser()
  const [question, setQuestion] = useState({});
  let [result , setResult] = useState(null);
  let attempt = {}
  let lang = ''

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (jwtDecode(localStorage.getItem("token")).exp <= currentTimestamp)
        navigate("/login");

      GetSingleQuestion(param.qid)
        .then((res) => {
          setQuestion(res.data);
          subscribeNotification(setResult)
        })
        .catch((e) => {
          console.log(e);
        });
    } else navigate("/login");
  }, []);
  return (
   
    <div className="container">
      
      <div className="row">
        <div className="col-5 questionDescription">
          <div className="container heading my-2">
            <h3>
              <b>{question.title}</b>
            </h3>
          </div>
          <div className="container body my-1">
            <div className="container description my-1">{question.description}</div>
            <div className="container examples my-1">
               {question.examples && question.examples.map(function(example,index){
                  return(
                     <div className="container examples my-2" key={index}>
                        <h5>Example {index + 1}</h5>
                        <div className="my-1">{example.input}</div>
                        <div className="my-1">{example.output}</div>
                        <div className="my-1">{example.explanation}</div>
                     </div>
                  )
               })}
            </div>
          </div>
        </div>
        <div className="col-lg answerDescription">
          <div className="container">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle my-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select Language
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.java;
                  lang = 'JAVA'}}>
                  Java
                </a>
                <a className="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.python;
                  lang = 'PYTHON'}}>
                  Python
                </a>
                <a className="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.cpp;
                  lang = 'CPP'}}>
                  C++
                </a>
              </div>
            </div>
            <div className="mb-3">
              <label for="codeArea" class="form-label">
                Write your code below
              </label>
              <textarea
                className="form-control"
                id="codeArea"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="container toolbar my-2">
            <button className="btn btn-success my-1" onClick={ () =>{
              if(lang === '') alert("Please select a language");
              else
              {
              attempt = {qid:question.qid , username:name, language:lang,code:document.getElementById("codeArea").value };
               SubmitAttempt(attempt).then(res=>{console.log(res);setResult('CHECKING')}).catch(e=>{console.log(e)})}}}>Submit</button>
          </div>
          {result != null && <div className="container result my-1">
            {result === 'SUCCESS' && <div className="p-3 mb-2 bg-success text-white">Correct Answer !!</div>}
            {result === 'CHECKING' && <div className="p-3 mb-2 bg-warning text-white">Running your code</div>}
            {result === 'FAILURE' && <div className="p-3 mb-2 bg-danger text-white">Your code failed. Please correct and submit again.</div>}
          </div>}
        </div>
      </div> 
    </div>
   );
};

export default SingleQuestion;
