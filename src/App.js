import './App.css';

import LoginPage from "./Pages/Login";
import HomePage from './Pages/Home';
import LoadingPage from './Pages/Loading'

import Cookies from 'js-cookie';
import { Component, React } from 'react';
import { GetUsername, GetLeeches, GetSubject } from './Wanikani'
import PAGES from './Pages';
import ReviewPage from './Pages/Review';

class App extends Component {
  constructor(props) {
    super(props);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.logout = this.logout.bind(this);
    this.startReview = this.startReview.bind(this);
    this.endReview = this.endReview.bind(this);
    this.leeches = null;
    this.first_leech = null;

    const existing_key = Cookies.get('api-key');
    let page = PAGES.login;
    let username = ''
    if (existing_key) {
      page = PAGES.config;
      username = Cookies.get('username');
    }

    this.state = { page: page, username: username, api_key: existing_key };
  }

  componentDidMount() {

    // Validate existing API key if any
    if (this.state.page === PAGES.config) {
      let existing_key = Cookies.get('api-key');
      this.checkAuthentication(existing_key);
    }

  }

  checkAuthentication(api_key) {
    GetUsername(api_key).then((username) => {
      if (username) {
        this.setState({ username: username, page: PAGES.config, api_key: api_key });
        Cookies.set('api-key', api_key);
        Cookies.set('username', username);
      } else if (!this.state.page === PAGES.login) {
        this.logout();
      }
    })
  }

  logout() {
    this.setState({ page: PAGES.login, username: '' });
    Cookies.remove('api-key');
  }

  startReview(percent, days) {
    this.setState({page: PAGES.loading});

    GetLeeches(this.state.api_key, percent, days).then((leeches) => {
      this.leeches = leeches;
      const first_leech_id = leeches[0].id;
      GetSubject(this.state.api_key, first_leech_id).then(first_leech => {
        this.first_leech = first_leech;
        this.setState({page: PAGES.reviewing});
      })
    })
  }

  endReview() {
    this.setState({page: PAGES.config});
  }

  render() {
    switch (this.state.page) {
      case PAGES.login:
        return <LoginPage checkLogin={this.checkAuthentication} />
      case PAGES.config:
        return <HomePage logout={this.logout} name={this.state.username} start={this.startReview} />
      case PAGES.loading:
        return <LoadingPage />
      case PAGES.reviewing:
        return <ReviewPage leeches={this.leeches} first_leech={this.first_leech} api_key={this.state.api_key} endReview={this.endReview} />
    }
  }
}

export default App;

