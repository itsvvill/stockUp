import { BrowserRouter, Switch, Route } from 'react-router-dom';
// styles
import './App.css';
// pages & components
import Home from './pages/home/Home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
