import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import GetSingleQuestion from "../apis/GetSingleQuestion";
import "./SingleQuestion.css";
import { subscribeNotification } from "../websocket/Notification";

const SingleQuestion = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [question, setQuestion] = useState({});
  let [result , setResult] = useState(null);
  //param.qid

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
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle my-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select Language
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.java}}>
                  Java
                </a>
                <a class="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.python}}>
                  Python
                </a>
                <a class="dropdown-item" onClick={() =>{
                  document.getElementById("codeArea").value = question.solutionTemplate.cpp}}>
                  C++
                </a>
              </div>
            </div>
            <div class="mb-3">
              <label for="codeArea" class="form-label">
                Write your code below
              </label>
              <textarea
                class="form-control"
                id="codeArea"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="container toolbar my-2">
            <button className="btn btn-success my-1" onClick={ () =>{alert(document.getElementById("codeArea").value)}}>Submit</button>
          </div>
          {result != null && <div className="container result my-1">
              Result
          </div>}
        </div>
      </div> 
    </div>
   );
};

export default SingleQuestion;
