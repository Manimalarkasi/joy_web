import { Button } from '@mui/material';
import React ,{ Component }from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


// function Homee() {
//     const navigate = useNavigate()
  // const logout =() =>{
  //   localStorage.removeItem("loggedin")
  //   navigate('/')
  // }
//   const username = JSON.parse( localStorage.getItem("user"));
//   return (
//     <div className='home'>Homee
//         <h4>welcome - {username.name}</h4>
//         <Button variant='contained' onClick={logout}>logout</Button>
//     </div>
//   )
// }



class Homee extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       userData:'',
    }
  }
  
  componentDidMount(){
    fetch('http://localhost:5176/home' ,{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({token:window.localStorage.getItem("token")}),
            token:window.localStorage.getItem("token")
        }).then((res)=> res.json())
        .then((data)=>{
          console.log(data,"home");
          this.setState({userData:data.data});
          if(data.data =="token expired"){
            alert("token expired login agine");
            window.localStorage.clear();
    window.location.href ="./login"
          }
        })
        // navigate('/home')
  }
  logout =() =>{
    window.localStorage.clear();
    window.location.href ="./login"
  }
  render() {
    return (
      <div>
        home
        <b style={{color:"brown"}}>name :</b>
        <h4>{this.state.userData.name}</h4>
        <b style={{color:"brown"}}> Employee ID :</b>
       
        <h4>{this.state.userData.empid}</h4>
        <b style={{color:"brown"}}>  Email :</b>
       
        <h4>{this.state.userData.email}</h4>
        <b style={{color:"brown"}}> phoneno :</b>
        
        <h4>{this.state.userData.phoneno}</h4>
        <Button variant='contained' onClick={this.logout}>logout</Button>
      </div>
    )
  }
}


export default Homee