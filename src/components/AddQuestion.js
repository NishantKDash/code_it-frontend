import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CreateQuestion from "../apis/CreateQuestion";
import jwtDecode from "jwt-decode";

const AddQuestion = () => {

  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if(jwtDecode(localStorage.getItem("token")).exp <= currentTimestamp)
      navigate("/login");
    }
  }, []);


    let question = {}
    let title = ''
    let description=''
    let solutionTemplate = {}
    let testcases = []
    let examples = []
    let exampleInput = ''
    let exampleOutput = ''
    let exampleExplanation = ''
    let testcaseTemplate = ''
    let testcaseOutput = '' 
    let javaTemplate = ''
    let pythonTemplate = ''
    let cppTemplate = ''

    function addExample()
    {
        if(exampleInput.length === 0 || exampleOutput.length === 0 || exampleExplanation.length === 0)
        alert("Fields are empty !")
        else
        {
         examples.push({input:exampleInput,output:exampleOutput,explanation:exampleExplanation})
         document.getElementById("exampleInput").value=""
         document.getElementById("exampleOutput").value=""
         document.getElementById("exampleExplanation").value=""
         alert("Example added successfully !")
        }
    }

    function addTestcase()
    {
        if(exampleInput.length === 0 || exampleOutput.length === 0 || exampleExplanation.length === 0)
        alert("Fields are empty !")
        else
        {
         testcases.push({questionTemplate:testcaseTemplate,output:testcaseOutput})
         document.getElementById("questionTemplate").value=""
         document.getElementById("testcaseOutput").value=""
         alert("TestCase added successfully !")
        }
    }

    function handleSubmit()
    {
        if(title.length === 0 || description.length === 0 || javaTemplate.length === 0 || pythonTemplate.length === 0 || cppTemplate.length === 0)
        alert("Some fields are empty !!")
        else
        {
            solutionTemplate = {java:javaTemplate,python:pythonTemplate,cpp:cppTemplate}
            question = {title:title , description:description , solutionTemplate:solutionTemplate , examples:examples , testCases:testcases}
            
            CreateQuestion(question).then(res=>{
              alert(res.data)
            }).catch(e=>{
              console.log(e)
            })


             question = {}
             title = ''
             description=''
             solutionTemplate = {}
             testcases = [{}]
             examples = [{}]
             exampleInput = ''
             exampleOutput = ''
             exampleExplanation = ''
             testcaseTemplate = ''
            testcaseOutput = '' 
             javaTemplate = ''
            pythonTemplate = ''
            cppTemplate = ''

        }
    }
  return (
    <div>
        <h1 className="container my-3">Question Addition Form</h1>
      <div className="question-about container">
        <h2 className="my-2">Basic Details</h2>
        <form>
          <div className="form-group">
            <label>Question Title</label>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter title for question"
              onChange={(e)=>{
                title = e.target.value;
              }}
            />
          </div>
          <div className="form-group my-2">
            <label>Description</label>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter description for question"
              onChange={(e)=>{
                description = e.target.value
              }}
            />
          </div>
          <div className="form-group">
            <label>Solution Template</label>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter solution template in java"
              onChange={(e)=>{
                javaTemplate = e.target.value;
              }}
            />
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter solution template in python"
              onChange={(e)=>{
                pythonTemplate = e.target.value;
              }}
            />
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter solution template for cpp"
              onChange={(e)=>{
                cppTemplate = e.target.value;
              }}
            />
          </div>
        </form>
      </div>
      <div className="question-example container my-2">
      <h2>Examples</h2>
        <form>
          <div className="form-group">
            <label>Example Input</label>
            <input
              type="text"
              id="exampleInput"
              className="form-control my-2"
              placeholder="Enter sample input"
              onChange={(e)=>{
                exampleInput = e.target.value;
              }}
            />
          </div>
          <div className="form-group my-2">
            <label>Example output</label>
            <input
              type="text"
              id="exampleOutput"
              className="form-control my-2"
              placeholder="Enter sample output"
              onChange={(e)=>{
                exampleOutput = e.target.value;
              }}
            />
          </div>
          <div className="form-group my-2">
            <label>Example explanation</label>
            <input
              type="text"
              id="exampleExplanation"
              className="form-control my-2"
              placeholder="Enter explanation for the example"
              onChange={(e)=>{
                exampleExplanation = e.target.value;
              }}
            />
          </div>
        </form>
        <button className="btn btn-success my-2" onClick={addExample}>Add example</button>
      </div>
      <div className="question-testcase container my-2">
      <h2>Testcases</h2>
        <form>
          <div className="form-group">
            <label>Question template</label>
            <input
              type="text"
              className="form-control my-2"
              id="questionTemplate"
              placeholder="Enter the template for this particular testcase"
              onChange={(e)=>{
                testcaseTemplate = e.target.value;
              }}
            />
          </div>
          <div className="form-group my-2">
            <label>Testcase output</label>
            <input
              type="text"
              className="form-control my-2"
              id="testcaseOutput"
              placeholder="Enter sample output for this particular testcase"
              onChange={(e)=>{
                testcaseOutput = e.target.value;
              }}
            />
          </div>
        </form>
        <button className="btn btn-success my-2" onClick={addTestcase}>Add testcase</button>
      </div>

      <button className="btn btn-danger mx-5 my-5" onClick={handleSubmit}>Add question</button>
    </div>
  );
};

export default AddQuestion;
