import React from 'react';
import Hero from './part/hero';
import PredictionForm from '../prediction/PredictionForm';

/** Home page body composed of the hero banner and the prediction form. */
const BodyHome: React.FC = () => {
  return (
    <div>
      <Hero />
      <PredictionForm />
    </div>
  );
};

export default BodyHome;
