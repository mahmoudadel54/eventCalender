  import { useEffect, useState } from 'react';
import {Route} from 'react-router-dom'; 
import GoogleWithLogin from './components/login/google-login';
import UserProvider from './context/userContext';
import axios from 'axios';
import Event from './components/event/event'
import Home from './components/Home';
import NavBar from './components/navbar/navbar';

function App() {

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(()=>{

    const checkLoggedIn = async ()=>{
      const token = localStorage.getItem('auth-token');
      if(token===null){
        localStorage.setItem('auth-token',"")
        setLoggedIn(false);
      }
      const tokenRes = await axios.post('http://localhost:4000/api/v1/googlelogin/tokenIsValid',null,{
        headers: {"x-auth-token": token}
      })

      if(tokenRes.data){
        const userRes = await axios.get('http://localhost:4000/api/v1/googlelogin',{
          headers:{'x-auth-token':token}
        })
        setLoggedIn(true)
      }
    }

    checkLoggedIn();

  },[])

  return (
    <UserProvider>
    <div className="App">
      <NavBar loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />
      <main>
        <Route path='/event' render={(props)=>
        <Event {...props} loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />
        } />
        <Route path='/login' render={(props)=>
        <GoogleWithLogin {...props} loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />
        } />
        <Route exact path='/' render={(props)=>
        <Home {...props} loggedIn={loggedIn} setLoggedIn = {setLoggedIn} />} />
      </main>
    </div>
    </UserProvider>
  );
}

export default App;
