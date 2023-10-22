import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function CreateQuestion(question)
{
    return axiosClient.post(`/api/question/create` , question , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}