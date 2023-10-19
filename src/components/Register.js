import React, { useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useNavigate ,Link} from 'react-router-dom'
import RegisterUser from '../apis/RegisterUser'
import jwtDecode from 'jwt-decode'

const Register = () => {

    const navigate = useNavigate()
    useEffect(() => {
      if (localStorage.getItem("token") != null) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if(jwtDecode(localStorage.getItem("token")).exp > currentTimestamp)
        navigate("/");
      }
    }, []);
    function onSubmit(values)
  {
   
       const user = {username : values.username , name: values.name , password : values.password}
       RegisterUser(user).then(res =>{ if(res.status === 200) navigate('/login')}).catch(err=>{console.log(err)})
       
       
  }

  function validate(values)
  {
    
    let errors = {
    }


    if(values.username.length < 5)
    errors.username = 'Username should be at least 5 characters'

    if(values.password.length < 5)
    errors.password = 'Password should be at least 5 characters'

    if(values.name.length < 5)
    errors.name = 'Name should be  at least 5 characters'

    return errors;
  }
  return (
    <div className='container'>
      <h1>Please enter the details to register</h1>

      <Formik initialValues={{name:"" , username:"" , password:""}}
                onSubmit = {onSubmit}
                validate={validate}
                validateOnChange = {false}
                validateOnBlur = {false}>
               

                  {
                     (props)=>(
                      <Form>
                        <ErrorMessage name ='name' component='div' className = 'alert alert-warning'></ErrorMessage>
                        <ErrorMessage name = 'username' component='div' className = 'alert alert-warning'></ErrorMessage>
                        <ErrorMessage name ='password' component='div' className = 'alert alert-warning'></ErrorMessage>
                        

                        <fieldset className='form-group'>
                          <label>Name</label>
                          <Field type='text' className='form-control' name='name'></Field>
                        </fieldset>
                        <fieldset className='form-group'>
                          <label>Username</label>
                          <Field type='text' className='form-control' name='username'></Field>
                        </fieldset>
                        <fieldset className='form-group'>
                          <label>Password</label>
                          <Field type='password' className='form-control' name='password'></Field>
                        </fieldset>

                        <div>
                          <button className='btn btn-success m-5' type='submit'>Sign-Up!</button>
                        </div>
                      </Form>
                     )               
                  }

              
             </Formik>
             <Link to='/login'>Already a user ? </Link>

    </div>
  )
}

export default Register