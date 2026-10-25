/**
 * Application entry point. Mounts the React tree into `#root` and loads
 * global Carbon styles and theme overrides.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './app/layout';
import Page from './app/page';
import 'carbon-components/css/carbon-components.css';
import './components/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Page />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
