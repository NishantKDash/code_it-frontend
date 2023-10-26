import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetAllAttempts()
{
    return axiosClient.get(`/api/attempt/all` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}