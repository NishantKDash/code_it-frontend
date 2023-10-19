import axios from "axios";


const axiosClient = axios.create({
  baseURL:'http://localhost:8080'
});

export default function LoginUser(user)
{
    return axiosClient.post(`/user/login` , user)
}