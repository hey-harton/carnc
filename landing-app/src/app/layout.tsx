import React from 'react';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

/** Props for {@link Layout}. */
interface LayoutProps {
  /** Page content rendered between the header and footer. */
  children: React.ReactNode;
}

/**
 * Root application shell with a fixed header, flexible main area, and footer.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      {/* Offset for the fixed 3rem Carbon header. */}
      <main style={{ flex: 1, marginTop: '3rem' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
