import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function SubmitAttempt(attempt)
{
    return axiosClient.post(`/api/attempt/submit` , attempt ,  { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}