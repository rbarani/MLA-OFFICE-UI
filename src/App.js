import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import './style.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import HomePage from '../src/components/home-page';
import Landing from '../src/components/landing';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.response) {
    return (
      <div>
        <HomePage />
      </div>
    );
  } else {
    return (
      <div>
        <Landing />
      </div>);
  }

}


export default App;
