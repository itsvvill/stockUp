import { BrowserRouter, Route } from 'react-router-dom';
// styles
import './App.css';
//components
import Home from './pages/home/Home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </BrowserRouter>
  );
}

export default App;
