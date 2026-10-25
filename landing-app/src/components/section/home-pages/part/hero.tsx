import React from 'react';
import { Button } from 'carbon-components-react';

/**
 * Landing hero banner with the product headline and a call-to-action that
 * scrolls to the prediction form (`#predict`).
 */
const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Mobile-only image banner so the car is not obscured by the hero card. */}
      <div className="hero-mobile-visual" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-card">
          <h1 className="hero-title">
            Prediksi Harga Mobil Bekas
          </h1>

          <p className="hero-description">
            Ketahui estimasi harga pasar wajar mobil bekas Anda secara akurat menggunakan model Machine Learning terlatih dengan data pasar otomotif Indonesia.
          </p>

          <div className="hero-actions">
            <Button
              href="#predict"
              size="large"
              className="hero-btn"
            >
              Mulai Prediksi Harga
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
