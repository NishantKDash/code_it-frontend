// import { Client } from '@stomp/stompjs';
// import jwtDecode from 'jwt-decode';


// const notificationClient = new Client();
// notificationClient.brokerURL = 'ws://localhost:8080/notification';

// notificationClient.activate()

// export function subscribeNotification(setResult)
// {
//     const username = jwtDecode(localStorage.getItem("token")).username
//     const subscription = notificationClient.subscribe(`/topic/${username}` , message => {let obj = JSON.parse(message.body); console.log(obj);setResult(obj.result)})
//     return subscription;
// }