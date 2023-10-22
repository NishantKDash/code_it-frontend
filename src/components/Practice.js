import React , {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import GetQuestionsForStudent from '../apis/GetQuestionsForStudent';
import jwtDecode from 'jwt-decode';

const Practice = () => {

    let [questions,setQuestion] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem("token") != null) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if(jwtDecode(localStorage.getItem("token")).exp <= currentTimestamp)
        navigate("/login");
        else
        {
          GetQuestionsForStudent()
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
            navigate(`/student/questions/${question.qid}`)
         }}>Solve</button></div>
      
       </div>
    
     );
   })}
 </div>
  )
}

export default Practice