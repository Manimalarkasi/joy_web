
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homee from './webpage/Homee';
import Login from './webpage/Login';
import Register from './webpage/Register';

function App() {
  const isloggedin = window.localStorage.getItem("loggedin")
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      <Route path='/' element={ isloggedin == "true" ? <Homee /> :<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homee />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
