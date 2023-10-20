import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetQuestions()
{
    return axiosClient.get(`/api/question` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}