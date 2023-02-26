import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Careers from './pages/careers/Careers';
import DataDeletion from './pages/privacy/DataDeletion';
import Footer from './components/Footer';
import Guide from './pages/guide/Guide';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import Privacy from './pages/privacy/Privacy';
import Signup from './pages/signup/Signup';
import StocksHome from './pages/stocks/StocksHome';
import TermsOfService from './pages/privacy/TermsOfService';
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
            </Route>
            <Route exact path="/guide">
              <Guide />
            </Route>
            <Route exact path="/careers">
              <Careers />
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
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/stocks" />}
              {!user && <Signup />}
            </Route>
            <Route exact path="/privacy">
              <Privacy />
            </Route>
            <Route path="/privacy/data">
              <DataDeletion />
            </Route>
            <Route path="/privacy/terms-of-service">
              <TermsOfService />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
