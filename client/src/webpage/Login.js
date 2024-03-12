import { Stack, TextField,Button ,Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate,NavLink } from 'react-router-dom';


function Login() {
    const navigate = useNavigate()
    const initialvalue ={
        email:'',
        password:'',
    }
    const validationSchema = Yup.object().shape({
        email:Yup.string().email('Invalid Email Format').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,'Invalid Email Format').required('!Requied'),
        password:Yup.string().matches(/^([A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,18}$/,'must be start with caps,the password is include uppercase,lowercase,secial case charactor,numbers').required('!Requied'),
    });
    const onsubmit = async(values,action)=>{
        console.log('form values:',values);
        action.resetForm();

    //     axios.post('http://localhost:5176/login-user',values)
    //     .then(res=>console.log(res))
    //  .catch(err=>console.log(err))
    //  navigate('/home')


        fetch('http://localhost:5176/login-user' ,{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify(values),
        }).then((res)=> res.json())
        .then((data)=>{console.log(data,"logged in")
        if(data.status =="ok"){
            console.log(data,"logged in")
            alert("login successfully");
            window.localStorage.setItem("token",data.data);
            window.localStorage.setItem("logged in",true);
            window.location.href= "./home";
        }
    })
        
        // navigate('/home')


      

        //      
        // const loggeduser = JSON.parse(localStorage.getItem("user"));
        //       if(values.email ===loggeduser.email && values.password === loggeduser.password){
        //         localStorage.setItem("loggedin: ",true);
        //         navigate("/home");
        //       }else{
        //         alert("wrong Email (or) Password")
        //       }

       
    }
  return (
    <div className='regi'>
        <Formik initialValues={initialvalue} validationSchema={validationSchema} onSubmit={onsubmit} validateOnMount>
            {formik =>{
                return(
                    <Form className='form'>
                        <h2>Login</h2>
                        <Stack spacing={2} direction={'column'}>
                        <Field as={TextField} label='email' name='email' required autoFocus className='input'/>
                        <ErrorMessage name='email'>
                            {err => <span style={{color:'red'}}>{err}</span>}
                        </ErrorMessage>
                        <Field as={TextField} label='password' type='password' name='password' required className='input'/>
                        <ErrorMessage name='password'>
                            {err => <span style={{color:'red'}}>{err}</span>}
                        </ErrorMessage>
                        <Button variant='contained' type='submit' disabled={!formik.isValid}  className='input' >Submit</Button>
                        <Typography style={{marginLeft:'160px'}}>
                          <NavLink to={'/register'}>register</NavLink>
                          </Typography>
                        </Stack>
                    </Form>
                )
            }}
        </Formik>
    </div>
  )
}

export default Login
