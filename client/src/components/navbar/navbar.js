import React, { useContext, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from "../../context/userContext";

export default function NavBar(props) {
  const { loggedIn, setLoggedIn } = props;
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory()
  useEffect(() => {
    if (localStorage.getItem("auth-token")) setLoggedIn(true);
  }, []);
  const toHomeAfterLogout = () => history.push("/");
 
  const Logout = () => {
    setUserData({
      name: "",
      email: "",
      token: ""
    })
    setLoggedIn(false);
    localStorage.setItem('user-name',"");
    localStorage.setItem('user-email',"");
    localStorage.setItem('auth-token',"");
    toHomeAfterLogout()
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="row navbar" style={{width:'100%'}}>
        <p style={{margin:'1rem', fontSize:'16px', fontWeight:'bolder'}}>Events Application</p>
        <Link to='/' style={{fontSize:'16px', fontWeight:'bolder'}}>Home</Link>
        <div>
          {loggedIn ? (
            <div className='row'>
              <label className='btn-secondary' style={{margin:'1rem'}}>Hello, {localStorage["user-name"]}</label>
              <br></br>
              <GoogleLogout
                // clientId="320711869666-4kfmt7jqll32i85airrq1ocrujkes0sm.apps.googleusercontent.com"
                clientId="320711869666-n6eps7kaesnlpssgo12m2f1kac08d9b3.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={Logout}
                className='btn btn-danger'
                isSignedIn={false}
              ></GoogleLogout>
            </div>
          ) : (
            <div className='row'>
              <label style={{margin:'1rem'}}>"You need to login" </label>
              <Link className="btn btn-primary" to= '/login'>
                Login
              </Link>
            </div>
          )}{" "}
        </div>
      </div>
      </nav>
    </div>
  );
}
