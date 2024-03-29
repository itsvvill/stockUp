import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Careers from './pages/careers/Careers';
import DataDeletion from './pages/privacy/DataDeletion';
import Guide from './pages/guide/Guide';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import NotFound from './pages/notfound/NotFound';
import Privacy from './pages/privacy/Privacy';
import Signup from './pages/auth/signup/Signup';
import StocksHome from './pages/stocks/StocksHome';
import TermsOfService from './pages/privacy/TermsOfService';
import TransactionsHome from './pages/transactions/TransactionsHome';
import User from './pages/user/User';

export default function AnimatedRoutes() {
  const { user } = useAuthContext();
  const location = useLocation();
  return (
    // Allows framer-motion to play exit or entrance animations on page switch
    <AnimatePresence mode="wait">
      <Switch location={location} key={location.pathname}>
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
        <Route path="/user">
          {user && <User />}
          {!user && <Redirect to="/" />}
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
        <Route
          exact
          path="/normal_redirect"
          render={() => {
            window.location.href = 'googlef65ed685ac309b13.html';
          }}
        />
      </Switch>
    </AnimatePresence>
  );
}
