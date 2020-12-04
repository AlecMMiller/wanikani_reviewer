import './App.css';
import LoginPage from "./Pages/Login";
import Cookies from 'js-cookie';
import { Component, React } from 'react';
import HomePage from './Pages/Home';
import { GetUsername } from './Wanikani'

class App extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.logout = this.logout.bind(this);

    let existing_key = Cookies.get('api-key');
    let is_authenticated = false
    if (existing_key) {
      is_authenticated = true
      this.checkAuthentication(existing_key);
    }

    this.state = { isAuthenticated: is_authenticated, username: '' };
  }

  checkAuthentication(api_key) {
    this.getUsername(api_key).then((username) => {
      if (username) {
        this.setState({ username: username, isAuthenticated: 'TRUE' });
        Cookies.set('api-key', api_key);
      }
    })
  }

  async getUsername(api_key) {
    let username = await GetUsername(api_key);
    console.log(username);
    return username;
  }

  logout() {
    this.setState({ isAuthenticated: false, username: '' });
    Cookies.remove('api-key');
  }

  render() {
    if (this.state.isAuthenticated) {
      return <HomePage logout={this.logout} name={this.state.username} />
    } else {
      return <LoginPage checkLogin={this.checkAuthentication} />
    }
  }
}

export default App;
