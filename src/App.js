import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cookies from 'js-cookie';
import { Component, React } from 'react';

function App() {
  console.log("Did a thing")
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <ProtectedRoute path="/" exact component={Home} />
    </Router>
  )
}

class ProtectedRoute extends Component {

  render() {
      const Component = this.props.component;
      const isAuthenticated = Cookies.get('api-key')
      console.log(isAuthenticated);

      if(isAuthenticated){
        console.log('Yup')
        return <Component />
      } else {
        console.log('Nope')
        return <Redirect to={{ pathname: '/login' }} />
      }
     
  }
}

export default App;
