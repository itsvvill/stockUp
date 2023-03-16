import { BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AnimatedRoutes from './AnimatedRoutes';

function App() {
  const { authIsReady } = useAuthContext();
  return (
    <div className="app">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
