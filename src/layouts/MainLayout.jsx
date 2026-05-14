import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import FloatingButtons from '../components/ui/FloatingButtons';

/* ── Main Layout ──────────────────────────────────────── */
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dentora-dark flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary animate-spin border-t-2 border-white" />
              <p className="text-dentora-primary font-medium font-inter text-sm">Loading...</p>
            </div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default MainLayout;
