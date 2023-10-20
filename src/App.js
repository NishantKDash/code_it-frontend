import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Questions from "./components/Questions";
import Error from "./components/Error";
import Logout from "./components/Logout";
import { UserProvider } from "./context/UserContext";




function App() {
  return (
    <div>
      <BrowserRouter>
      <UserProvider>
       <Navbar></Navbar>
       <Routes>
           <Route path ='/' element = {<HomePage/>}></Route>
           <Route path = '/login' element = {<Login/>}></Route>
           <Route path = '/register' element = {<Register/>}></Route>
           <Route path = '/questions' element = {<Questions/>}></Route>
           <Route path ='/*' element={<Error></Error>}></Route>
           <Route path = '/logout' element = {<Logout/>}></Route>
           <Route path = '/admin/questions' element = {<Questions/>}></Route>
       </Routes>
       </UserProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
