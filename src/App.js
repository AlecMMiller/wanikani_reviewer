import './App.css';
import LoginPage from "./Pages/Login";
import Cookies from 'js-cookie';
import { Component, React } from 'react';
import HomePage from './Pages/Home';
import { GetUsername } from './Wanikani'

function getGreeting(){
  const d = new Date();
  const hours = d.getHours();

  var greeting =''

    if(hours < 3 || hours > 22){
      greeting = "おやすみんさい";
    } else if (hours < 12){
      greeting = "おはようございます";
    } else if (hours < 18){
      greeting = "こんにちは";
    } else {
      greeting = "こんばんは"
    }

    return greeting;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.logout = this.logout.bind(this);

    const greeting = getGreeting();    

    const existing_key = Cookies.get('api-key');
    let is_authenticated = false;
    let username = ''
    if (existing_key) {
      is_authenticated = true;
      username = Cookies.get('username');
    }

    this.state = { isAuthenticated: is_authenticated, username: username, greeting: greeting };
  }

  componentDidMount(){

    // Validate existing API key if any
    if(this.state.is_authenticated){
      let existing_key = Cookies.get('api-key');
      this.checkAuthentication(existing_key);
    }

  }

  checkAuthentication(api_key) {
    GetUsername(api_key).then((username) => {
      if (username) {
        this.setState({ username: username, isAuthenticated: true });
        Cookies.set('api-key', api_key);
        Cookies.set('username', username);
      } else if (this.state.isAuthenticated) {
        this.logout();
      }
    })
  }

  logout() {
    this.setState({ isAuthenticated: false, username: '' });
    Cookies.remove('api-key');
  }

  render() {
    if (this.state.isAuthenticated) {
      return <HomePage logout={this.logout} name={this.state.username} greeting={this.state.greeting} />
    } else {
      return <LoginPage checkLogin={this.checkAuthentication} />
    }
  }
}

export default App;
