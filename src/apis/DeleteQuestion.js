import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function DeleteQuestion(id)
{
    return axiosClient.delete(`/api/question/delete/${id}` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}