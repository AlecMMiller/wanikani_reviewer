import React from "react";
import Cookies from 'js-cookie';
import { Redirect, withRouter } from "react-router";

function Login(){

    const [logged_in, setLoggedIn] = React.useState(false)
    //Cookies.remove('api-key');

    if(logged_in){
        console.log("Redirecting")
        return <Redirect to="/" />
    }

    const handle_login = () => {
        var api_key = document.getElementById('api_key').value;
        Cookies.set('api-key', api_key);
        console.log("Redirect");
        setLoggedIn(true);
    }

    return (
        <div>
            <h1>ようこそ!</h1>
            <p>Please enter your API key</p>
            <input type="text" id="api_key"/><br/>
            <button onClick={handle_login}>Login</button>
        </div>
    );
}

export default withRouter(Login)