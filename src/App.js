import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Careers from './pages/careers/Careers';
import Footer from './components/Footer';
import Guide from './pages/guide/Guide';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import Signup from './pages/signup/Signup';
import StocksHome from './pages/stocks/StocksHome';
import TransactionsHome from './pages/transactions/TransactionsHome';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/stocks">
              {user && <StocksHome />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              <Home />
              <Footer />
            </Route>
            <Route exact path="/guide">
              <Guide />
              <Footer />
            </Route>
            <Route exact path="/careers">
              <Careers />
              <Footer />
            </Route>
            <Route exact path="/transactions">
              {user && (
                <>
                  <TransactionsHome />
                </>
              )}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/stocks" />}
              {!user && <Login />}
              <Footer />
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/stocks" />}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
