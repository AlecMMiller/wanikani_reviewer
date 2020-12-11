import { Component, React } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this)
  }

  checkLogin() {
    var api_key = document.getElementById('api_key').value;
    this.props.checkLogin(api_key);
  }

  render() {
    return (
      <div className='login'>
        <div className='login_content'>
          <h1 className='title'>ようこそ!</h1>
          <p className='login_description'>Please enter your API key</p>
          <p className='login_hint'>(You can get it <a href="https://www.wanikani.com/settings/personal_access_tokens" target="_blank">here</a>)</p>
          <input class='api_input' type="text" id="api_key" placeholder="API Key" /><br />
          <button onClick={this.checkLogin}>Login</button>
        </div>
      </div>
    )
  }
}

export default LoginPage