import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import useSmoothScroll from './hooks/useSmoothScroll';

/* ── App Root ─────────────────────────────────────────── */
const AppContent = () => {
  useSmoothScroll(); // Initialize Lenis smooth scrolling
  return <AppRoutes />;
};

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
          {/* Global Toast Notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                borderRadius: '1rem',
                background: '#0f172a',
                color: '#f1f5f9',
                border: '1px solid rgba(8,145,178,0.3)',
                boxShadow: '0 8px 32px rgba(8,145,178,0.2)',
              },
              success: {
                iconTheme: { primary: '#14b8a6', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;