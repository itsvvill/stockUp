import { BrowserRouter, Switch, Route } from 'react-router-dom';
// styles
import './App.css';
//components
import Home from './pages/home/Home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
