import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';
import Loader from './components/loaders/Loader.jsx';

/* ── Entry Point with Loader ──────────────────────────── */
const Root = () => {
  const [loading, setLoading] = useState(true);

  return loading ? (
    <Loader onComplete={() => setLoading(false)} />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
