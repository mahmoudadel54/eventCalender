import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";

import { UserContext } from "../../context/userContext";

import './style.css'

export default function GoogleWithLogin(props) {
  const { userData, setUserData } = useContext(UserContext);
  const {  setLoggedIn } = props;
  const history = useHistory();
  const login = () => history.push("/event");

  //success in login
  const responseSuccessGoogle = async (response) => {
    // dataRes -- > user {name, email, Idtoken}, token
    const dataRes = await axios.post(
      "/api/v1/googlelogin",
      { tokenId: response.tokenId }
    );

    if (dataRes) {
      localStorage.setItem("auth-token", dataRes.data.token);
      localStorage.setItem("user-name", dataRes.data.user.name);
      localStorage.setItem("user-email", dataRes.data.user.email);
      setUserData({
        name: dataRes.data.user.name,
        email: dataRes.data.user.email,
        token: dataRes.data.token,
      });
      setLoggedIn(true);
      login();
      
    }
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };
  return (
    <div id="login-container">
      <h1 style={{textAlign:'center'}}>Login with Google</h1>
      <GoogleLogin
        // clientId="320711869666-4kfmt7jqll32i85airrq1ocrujkes0sm.apps.googleusercontent.com"
        clientId="320711869666-n6eps7kaesnlpssgo12m2f1kac08d9b3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseFailureGoogle}
        cookiePolicy={"single_host_origin"}
        className='login-btn'
      />
    </div>
  );
}
