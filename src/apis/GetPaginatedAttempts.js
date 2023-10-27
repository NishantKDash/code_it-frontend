import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function GetPaginatedAttempts(page ,size)
{
    return axiosClient.get(`/api/attempt/paginatedAttempt?page=${page}&size=${size}` , { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
}