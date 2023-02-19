import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import StocksHome from './pages/stocks/StocksHome';
import Footer from './components/Footer';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user && <StocksHome />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/transactions">
              {user && (
                <>
                  <Home />
                </>
              )}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
              <Footer />
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
