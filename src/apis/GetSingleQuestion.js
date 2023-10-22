import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetSingleQuestion(qid)
{
    return axiosClient.get(`/api/question/${qid}` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}