import React from 'react';

/** Global application footer with the copyright notice. */
const Footer: React.FC = () => {
  return (
    <footer
      className="footer-container"
      style={{
        height: '3rem',
        minHeight: '3rem',
        backgroundColor: '#0b1612',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
        boxSizing: 'border-box',
        padding: '0 1rem',
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
        <p className="footer-text" style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} <strong style={{ color: '#ffffff' }}>CarNC</strong> &bull; Platform Prediksi Harga Mobil Bekas. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
