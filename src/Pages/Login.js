import { Component, React } from 'react';

class LoginPage extends Component{
    constructor(props) {
      super(props);
      this.checkLogin = this.checkLogin.bind(this)
    }
  
    checkLogin(){
        var api_key = document.getElementById('api_key').value;
        this.props.checkLogin(api_key);
    }
  
    render(){
      return(
        <div>
            <h1>ようこそ!</h1>
            <p>Please enter your API key</p>
            <input type="text" id="api_key"/><br/>
            <button onClick={this.checkLogin}>Login</button>
        </div>
      )
    }
  }

  export default LoginPage