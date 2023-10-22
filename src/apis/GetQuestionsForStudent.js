import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetQuestionsForStudent()
{
    return axiosClient.get(`/api/question/student` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}