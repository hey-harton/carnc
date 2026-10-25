import React from 'react';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderGlobalBar,
} from 'carbon-components-react';
import { LogoGithub20 } from '@carbon/icons-react';

/**
 * Global application header with the CarNC brand and a link to the
 * project's GitHub repository.
 */
const Header: React.FC = () => {
  return (
    <CarbonHeader aria-label="CarNC Platform">
      <HeaderName
        href="/"
        prefix=""
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
      >
        <img
          src="/images/carnc-logo.svg"
          alt="CarNC Logo"
          style={{ width: '24px', height: '24px', borderRadius: '5px', objectFit: 'contain' }}
        />
        <span style={{ fontWeight: 600 }}>CarNC</span>
      </HeaderName>
      <HeaderGlobalBar>
        <a
          href="https://github.com/hey-harton/carnc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: '#f4f4f4',
            padding: '0 1rem',
            height: '3rem',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 400,
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#162720')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <LogoGithub20 />
          <span>GitHub</span>
        </a>
      </HeaderGlobalBar>
    </CarbonHeader>
  );
};

export default Header;
